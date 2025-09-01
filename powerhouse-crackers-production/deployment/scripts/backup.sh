#!/bin/bash

# Powerhouse Crackers - Backup Script

set -e

APP_DIR="/var/www/powerhouse-crackers"
BACKUP_DIR="/var/backups/powerhouse"
DATE=$(date +%Y%m%d-%H%M%S)

log_info() { echo -e "\033[0;34m[INFO]\033[0m $1"; }
log_success() { echo -e "\033[0;32m[SUCCESS]\033[0m $1"; }

log_info "Starting backup process..."

# Create backup directory
mkdir -p $BACKUP_DIR

# Backup orders data
if [ -d "$APP_DIR/backend/data/orders" ]; then
    tar -czf $BACKUP_DIR/orders-$DATE.tar.gz -C $APP_DIR/backend/data orders/
    log_success "Orders data backed up"
fi

# Backup configuration files
tar -czf $BACKUP_DIR/config-$DATE.tar.gz $APP_DIR/backend/.env.production /etc/nginx/sites-available/powerhouse.conf

# Backup logs
if [ -d "$APP_DIR/logs" ]; then
    tar -czf $BACKUP_DIR/logs-$DATE.tar.gz -C $APP_DIR logs/
    log_success "Logs backed up"
fi

# Remove old backups (keep last 7 days)
find $BACKUP_DIR -name "*.tar.gz" -mtime +7 -delete

log_success "Backup completed: $BACKUP_DIR"
