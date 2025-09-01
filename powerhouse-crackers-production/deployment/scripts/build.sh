#!/bin/bash

# Powerhouse Crackers - Build and Optimization Script

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

log_info() { echo -e "${BLUE}[INFO]${NC} $1"; }
log_success() { echo -e "${GREEN}[SUCCESS]${NC} $1"; }
log_warning() { echo -e "${YELLOW}[WARNING]${NC} $1"; }

log_info "Building and optimizing Powerhouse Crackers..."

# Create build directory
mkdir -p build
rm -rf build/*

# Copy and optimize frontend
log_info "Optimizing frontend files..."
cp -r frontend build/
cp -r order-page build/

# Minify CSS files (if csso is available)
if command -v csso &> /dev/null; then
    find build -name "*.css" -exec csso {} --output {} \;
    log_success "CSS files minified"
fi

# Optimize images (if imagemin is available)
if command -v imagemin &> /dev/null; then
    find build -name "*.jpg" -o -name "*.png" -o -name "*.jpeg" | xargs imagemin --out-dir=build/optimized-images
    log_success "Images optimized"
fi

# Generate gzip versions for nginx
log_info "Pre-compressing static files..."
find build -type f \( -name "*.html" -o -name "*.css" -o -name "*.js" -o -name "*.json" \) -exec gzip -k {} \;

# Create deployment package
log_info "Creating deployment package..."
tar -czf powerhouse-crackers-$(date +%Y%m%d-%H%M%S).tar.gz build/

log_success "Build completed successfully!"
log_info "Deployment package created in current directory"
