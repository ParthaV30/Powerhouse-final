#!/bin/bash

# Powerhouse Crackers - Production Deployment Script
# This script sets up and deploys the complete Powerhouse Crackers platform

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
APP_NAME="powerhouse-crackers"
APP_DIR="/var/www/$APP_NAME"
NGINX_CONF="/etc/nginx/sites-available/powerhouse.conf"
SERVICE_USER="www-data"

# Functions
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

check_root() {
    if [[ $EUID -ne 0 ]]; then
        log_error "This script must be run as root (use sudo)"
        exit 1
    fi
}

check_os() {
    if ! command -v apt &> /dev/null; then
        log_error "This script is designed for Ubuntu/Debian systems"
        exit 1
    fi
    log_success "Operating system check passed"
}

install_dependencies() {
    log_info "Installing system dependencies..."

    # Update package list
    apt update -y

    # Install required packages
    apt install -y curl wget git nginx ufw fail2ban

    # Install Node.js 18.x
    curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
    apt install -y nodejs

    # Install PM2 globally
    npm install -g pm2

    # Install certbot for SSL
    apt install -y certbot python3-certbot-nginx

    log_success "Dependencies installed successfully"
}

setup_firewall() {
    log_info "Configuring firewall..."

    # Reset UFW to defaults
    ufw --force reset

    # Default policies
    ufw default deny incoming
    ufw default allow outgoing

    # Allow SSH, HTTP, HTTPS
    ufw allow ssh
    ufw allow 80/tcp
    ufw allow 443/tcp

    # Enable firewall
    ufw --force enable

    log_success "Firewall configured successfully"
}

setup_fail2ban() {
    log_info "Configuring fail2ban..."

    # Create jail configuration for nginx
    cat > /etc/fail2ban/jail.local << EOF
[nginx-http-auth]
enabled = true

[nginx-limit-req]
enabled = true
port = http,https
filter = nginx-limit-req
logpath = /var/log/nginx/error.log

[sshd]
enabled = true
port = ssh
logpath = /var/log/auth.log
maxretry = 3
bantime = 3600
EOF

    systemctl restart fail2ban
    systemctl enable fail2ban

    log_success "Fail2ban configured successfully"
}

create_directories() {
    log_info "Creating application directories..."

    # Create main app directory
    mkdir -p $APP_DIR
    mkdir -p $APP_DIR/frontend
    mkdir -p $APP_DIR/order-page
    mkdir -p $APP_DIR/backend
    mkdir -p $APP_DIR/logs
    mkdir -p $APP_DIR/backups

    # Set ownership
    chown -R $SERVICE_USER:$SERVICE_USER $APP_DIR

    log_success "Directories created successfully"
}

deploy_application() {
    log_info "Deploying application files..."

    # Copy application files
    if [ -d "./frontend" ]; then
        cp -r ./frontend/* $APP_DIR/frontend/
    fi

    if [ -d "./order-page" ]; then
        cp -r ./order-page/* $APP_DIR/order-page/
    fi

    if [ -d "./backend" ]; then
        cp -r ./backend/* $APP_DIR/backend/
    fi

    # Copy shared assets
    if [ -d "./shared" ]; then
        cp -r ./shared/* $APP_DIR/
    fi

    # Set permissions
    chown -R $SERVICE_USER:$SERVICE_USER $APP_DIR
    chmod -R 755 $APP_DIR

    log_success "Application files deployed successfully"
}

setup_backend() {
    log_info "Setting up backend application..."

    cd $APP_DIR/backend

    # Install dependencies
    sudo -u $SERVICE_USER npm install --production

    # Check if .env.production exists
    if [ ! -f ".env.production" ]; then
        log_warning ".env.production not found. Creating template..."
        sudo -u $SERVICE_USER cp .env.example .env.production
        log_warning "Please edit $APP_DIR/backend/.env.production with your configuration"
    fi

    # Start application with PM2
    sudo -u $SERVICE_USER pm2 start ecosystem.config.js --env production
    sudo -u $SERVICE_USER pm2 save

    # Setup PM2 startup
    pm2 startup systemd -u $SERVICE_USER --hp /home/$SERVICE_USER

    log_success "Backend application started successfully"
}

configure_nginx() {
    log_info "Configuring nginx..."

    # Copy nginx configuration
    cp ./deployment/nginx/powerhouse.conf $NGINX_CONF

    # Create symlink to enable site
    ln -sf $NGINX_CONF /etc/nginx/sites-enabled/

    # Remove default site
    rm -f /etc/nginx/sites-enabled/default

    # Test nginx configuration
    nginx -t

    # Start and enable nginx
    systemctl start nginx
    systemctl enable nginx

    log_success "Nginx configured successfully"
}

setup_ssl() {
    log_info "Setting up SSL certificate..."

    read -p "Enter your domain name (e.g., example.com): " DOMAIN
    read -p "Enter your email for SSL certificate: " EMAIL

    if [ -n "$DOMAIN" ] && [ -n "$EMAIL" ]; then
        # Update nginx configuration with actual domain
        sed -i "s/your-domain.com/$DOMAIN/g" $NGINX_CONF

        # Reload nginx
        systemctl reload nginx

        # Get SSL certificate
        certbot --nginx -d $DOMAIN -d www.$DOMAIN --email $EMAIL --agree-tos --non-interactive

        # Setup auto-renewal
        (crontab -l 2>/dev/null; echo "0 12 * * * /usr/bin/certbot renew --quiet") | crontab -

        log_success "SSL certificate configured successfully"
    else
        log_warning "Domain or email not provided. SSL setup skipped."
        log_warning "You can run 'sudo certbot --nginx' manually later"
    fi
}

setup_monitoring() {
    log_info "Setting up monitoring and logging..."

    # Create log rotation configuration
    cat > /etc/logrotate.d/powerhouse << EOF
$APP_DIR/logs/*.log {
    daily
    missingok
    rotate 14
    compress
    delaycompress
    notifempty
    create 644 $SERVICE_USER $SERVICE_USER
    postrotate
        systemctl reload nginx
    endscript
}
EOF

    # Setup automated backup
    cat > /usr/local/bin/powerhouse-backup << EOF
#!/bin/bash
cd $APP_DIR/backend
sudo -u $SERVICE_USER node utils/backup.js
EOF
    chmod +x /usr/local/bin/powerhouse-backup

    # Add to crontab for daily backups
    (crontab -l 2>/dev/null; echo "0 2 * * * /usr/local/bin/powerhouse-backup") | crontab -

    log_success "Monitoring and backup configured successfully"
}

run_health_check() {
    log_info "Running health checks..."

    sleep 5  # Wait for services to start

    # Check nginx
    if systemctl is-active --quiet nginx; then
        log_success "Nginx is running"
    else
        log_error "Nginx is not running"
    fi

    # Check backend
    if curl -f http://localhost:3000/api/health > /dev/null 2>&1; then
        log_success "Backend API is responding"
    else
        log_error "Backend API is not responding"
    fi

    # Check frontend files
    if [ -f "$APP_DIR/frontend/index.html" ]; then
        log_success "Frontend files are in place"
    else
        log_warning "Frontend files not found"
    fi
}

print_summary() {
    echo
    echo "======================================"
    echo "🎆 POWERHOUSE CRACKERS DEPLOYMENT COMPLETE 🎆"
    echo "======================================"
    echo
    log_info "Application URL: https://your-domain.com"
    log_info "Order Page: https://your-domain.com/order"
    log_info "API Health: https://your-domain.com/api/health"
    echo
    log_info "Application directory: $APP_DIR"
    log_info "Logs directory: $APP_DIR/logs"
    log_info "Nginx config: $NGINX_CONF"
    echo
    log_info "Useful commands:"
    echo "  - View logs: pm2 logs powerhouse-api"
    echo "  - Restart app: pm2 restart powerhouse-api"
    echo "  - Check status: pm2 status"
    echo "  - View nginx logs: tail -f /var/log/nginx/powerhouse.error.log"
    echo "  - Create backup: /usr/local/bin/powerhouse-backup"
    echo
    log_warning "Remember to:"
    echo "  1. Configure $APP_DIR/backend/.env.production"
    echo "  2. Update domain name in nginx configuration"
    echo "  3. Set up SSL certificate with certbot"
    echo
}

# Main deployment flow
main() {
    log_info "Starting Powerhouse Crackers deployment..."

    check_root
    check_os
    install_dependencies
    setup_firewall
    setup_fail2ban
    create_directories
    deploy_application
    setup_backend
    configure_nginx
    setup_ssl
    setup_monitoring
    run_health_check
    print_summary

    log_success "Deployment completed successfully! 🎆"
}

# Run main function
main "$@"
