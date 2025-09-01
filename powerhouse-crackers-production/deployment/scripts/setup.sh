#!/bin/bash

# Powerhouse Crackers - Initial Server Setup Script
# Run this script first on a fresh Ubuntu server

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

log_info() { echo -e "${BLUE}[INFO]${NC} $1"; }
log_success() { echo -e "${GREEN}[SUCCESS]${NC} $1"; }
log_warning() { echo -e "${YELLOW}[WARNING]${NC} $1"; }
log_error() { echo -e "${RED}[ERROR]${NC} $1"; }

# Check if running as root
if [[ $EUID -ne 0 ]]; then
    log_error "This script must be run as root (use sudo)"
    exit 1
fi

log_info "Starting initial server setup for Powerhouse Crackers..."

# Update system
log_info "Updating system packages..."
apt update && apt upgrade -y

# Install essential packages
log_info "Installing essential packages..."
apt install -y curl wget git htop unzip software-properties-common apt-transport-https ca-certificates gnupg lsb-release

# Create application user
log_info "Creating application user..."
if ! id "powerhouse" &>/dev/null; then
    useradd -m -s /bin/bash powerhouse
    usermod -aG sudo powerhouse
    log_success "User 'powerhouse' created"
else
    log_info "User 'powerhouse' already exists"
fi

# Set up SSH key (optional)
read -p "Do you want to set up SSH key authentication? (y/n): " SETUP_SSH
if [[ $SETUP_SSH == "y" || $SETUP_SSH == "Y" ]]; then
    read -p "Enter your public SSH key: " SSH_KEY
    if [[ -n "$SSH_KEY" ]]; then
        sudo -u powerhouse mkdir -p /home/powerhouse/.ssh
        echo "$SSH_KEY" | sudo -u powerhouse tee /home/powerhouse/.ssh/authorized_keys
        sudo -u powerhouse chmod 700 /home/powerhouse/.ssh
        sudo -u powerhouse chmod 600 /home/powerhouse/.ssh/authorized_keys
        log_success "SSH key added for user 'powerhouse'"
    fi
fi

# Configure timezone
log_info "Configuring timezone..."
timedatectl set-timezone Asia/Kolkata
log_success "Timezone set to Asia/Kolkata"

# Basic security setup
log_info "Applying basic security configurations..."

# Disable root login via SSH
sed -i 's/#PermitRootLogin yes/PermitRootLogin no/' /etc/ssh/sshd_config
sed -i 's/PermitRootLogin yes/PermitRootLogin no/' /etc/ssh/sshd_config

# Disable password authentication (if SSH key is set)
if [[ $SETUP_SSH == "y" || $SETUP_SSH == "Y" ]]; then
    sed -i 's/#PasswordAuthentication yes/PasswordAuthentication no/' /etc/ssh/sshd_config
    sed -i 's/PasswordAuthentication yes/PasswordAuthentication no/' /etc/ssh/sshd_config
fi

systemctl restart ssh

# Install Docker (optional)
read -p "Do you want to install Docker? (y/n): " INSTALL_DOCKER
if [[ $INSTALL_DOCKER == "y" || $INSTALL_DOCKER == "Y" ]]; then
    log_info "Installing Docker..."
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
    echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null
    apt update
    apt install -y docker-ce docker-ce-cli containerd.io
    usermod -aG docker powerhouse
    systemctl enable docker
    log_success "Docker installed successfully"
fi

# Set up swap (if not exists)
if ! swapon --show | grep -q swap; then
    log_info "Setting up swap file..."
    fallocate -l 2G /swapfile
    chmod 600 /swapfile
    mkswap /swapfile
    swapon /swapfile
    echo '/swapfile none swap sw 0 0' | tee -a /etc/fstab
    log_success "2GB swap file created"
fi

# Install monitoring tools
log_info "Installing monitoring tools..."
apt install -y htop iotop nethogs

log_success "Initial server setup completed!"
log_info "Next steps:"
echo "  1. Reboot the server: sudo reboot"
echo "  2. Login as 'powerhouse' user"
echo "  3. Clone the application repository"
echo "  4. Run the deployment script: sudo ./deployment/scripts/deploy.sh"
