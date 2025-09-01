#!/bin/bash

# Powerhouse Crackers - Initial Server Setup Script (Amazon Linux 2 / 2023)
# Run this script first on a fresh Amazon Linux server

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

log_info()    { echo -e "${BLUE}[INFO]${NC} $1"; }
log_success() { echo -e "${GREEN}[SUCCESS]${NC} $1"; }
log_warning() { echo -e "${YELLOW}[WARNING]${NC} $1"; }
log_error()   { echo -e "${RED}[ERROR]${NC} $1"; }

# --------------- OS detection helpers ---------------
is_amzn2()     { grep -qi "Amazon Linux 2" /etc/os-release; }
is_amzn2023()  { grep -qi "Amazon Linux 2023" /etc/os-release; }

PKG_UPDATE()   { is_amzn2023 && dnf -y update || yum -y update; }
PKG_INSTALL()  { if is_amzn2023; then dnf install -y "$@"; else yum install -y "$@"; fi; }

# Check if running as root
if [[ $EUID -ne 0 ]]; then
  log_error "This script must be run as root (use sudo)"
  exit 1
fi

# Check OS
if ! (is_amzn2 || is_amzn2023); then
  log_error "This script is intended for Amazon Linux 2 or Amazon Linux 2023."
  exit 1
fi

log_info "Starting initial server setup for Powerhouse Crackers on Amazon Linux..."

# ---------------- System update ----------------
log_info "Updating system packages..."
PKG_UPDATE

# ---------------- Essentials ----------------
log_info "Installing essential packages..."
# Enable EPEL (needed for some tools like nethogs/iotop in some repos)
if is_amzn2; then
  amazon-linux-extras install -y epel || true
  PKG_INSTALL epel-release || true
else
  # AL2023: EPEL is available via 'epel-release'
  PKG_INSTALL epel-release || true
fi

PKG_INSTALL curl wget git htop unzip tar jq ca-certificates gnupg2

# ---------------- Create application user ----------------
APP_USER="powerhouse"
log_info "Creating application user..."
if ! id "$APP_USER" &>/dev/null; then
  useradd -m -s /bin/bash "$APP_USER"
  # Amazon Linux uses the 'wheel' group for sudo
  PKG_INSTALL sudo || true
  usermod -aG wheel "$APP_USER"
  # ensure wheel has sudo without password prompt commented in defaults
  if ! grep -qE '^%wheel' /etc/sudoers; then
    echo "%wheel ALL=(ALL) NOPASSWD: ALL" >> /etc/sudoers
  fi
  log_success "User '$APP_USER' created and added to 'wheel'"
else
  log_info "User '$APP_USER' already exists"
fi

# ---------------- SSH key setup (optional) ----------------
read -p "Do you want to set up SSH key authentication? (y/n): " SETUP_SSH
if [[ $SETUP_SSH =~ ^[yY]$ ]]; then
  read -p "Enter your public SSH key: " SSH_KEY
  if [[ -n "$SSH_KEY" ]]; then
    sudo -u "$APP_USER" mkdir -p /home/"$APP_USER"/.ssh
    echo "$SSH_KEY" | sudo -u "$APP_USER" tee /home/"$APP_USER"/.ssh/authorized_keys >/dev/null
    sudo -u "$APP_USER" chmod 700 /home/"$APP_USER"/.ssh
    sudo -u "$APP_USER" chmod 600 /home/"$APP_USER"/.ssh/authorized_keys
    log_success "SSH key added for user '$APP_USER'"
  else
    log_warning "No SSH key provided. Skipping key setup."
  fi
fi

# ---------------- Timezone ----------------
log_info "Configuring timezone..."
timedatectl set-timezone Asia/Kolkata
log_success "Timezone set to Asia/Kolkata"

# ---------------- Basic security ----------------
log_info "Applying basic security configurations..."

# Harden SSH: disable root login
SSHD_CFG="/etc/ssh/sshd_config"
sed -i 's/^[#[:space:]]*PermitRootLogin .*/PermitRootLogin no/' "$SSHD_CFG"

# Disable password auth if SSH key was configured
if [[ $SETUP_SSH =~ ^[yY]$ ]]; then
  sed -i 's/^[#[:space:]]*PasswordAuthentication .*/PasswordAuthentication no/' "$SSHD_CFG"
fi

# Ensure PubkeyAuthentication on
if ! grep -q '^PubkeyAuthentication yes' "$SSHD_CFG"; then
  echo "PubkeyAuthentication yes" >> "$SSHD_CFG"
fi

# Restart sshd (Amazon Linux service name)
systemctl restart sshd
log_success "SSHD reloaded with secure settings"

# ---------------- Docker (optional) ----------------
read -p "Do you want to install Docker? (y/n): " INSTALL_DOCKER
if [[ $INSTALL_DOCKER =~ ^[yY]$ ]]; then
  log_info "Installing Docker..."
  if is_amzn2; then
    # Prefer Amazon Linux Extras for AL2
    amazon-linux-extras enable docker
    PKG_INSTALL docker
  else
    # AL2023
    PKG_INSTALL docker
  fi

  systemctl enable docker
  systemctl start docker
  usermod -aG docker "$APP_USER"
  log_success "Docker installed and started. User '$APP_USER' added to docker group."
fi

# ---------------- Swap (if missing) ----------------
if ! swapon --show | grep -q 'partition\|file'; then
  log_info "Setting up 2G swap file..."
  fallocate -l 2G /swapfile || dd if=/dev/zero of=/swapfile bs=1M count=2048
  chmod 600 /swapfile
  mkswap /swapfile
  swapon /swapfile
  if ! grep -q '^/swapfile ' /etc/fstab; then
    echo '/swapfile none swap sw 0 0' >> /etc/fstab
  fi
  log_success "2GB swap file created"
else
  log_info "Swap already configured. Skipping."
fi

# ---------------- Monitoring tools ----------------
log_info "Installing monitoring tools..."
# Try to install; if a package is unavailable in current repo, skip gracefully.
PKG_INSTALL htop || true
PKG_INSTALL iotop || true
PKG_INSTALL nethogs || true

log_success "Initial server setup completed!"
log_info "Next steps:"
echo "  1. Reboot the server: sudo reboot"
echo "  2. Login as '${APP_USER}' user"
echo "  3. Clone the application repository"
echo "  4. Run the deployment script: sudo ./deployment/scripts/deploy.sh"
