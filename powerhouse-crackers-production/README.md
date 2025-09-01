# Powerhouse Crackers - Production Deployment

🎆 **Premium Fireworks E-commerce Platform**

A complete e-commerce solution for Powerhouse Crackers featuring a modern frontend, comprehensive product catalog, and robust backend API.

## 🚀 Quick Deployment Guide

### Prerequisites
- Ubuntu 20.04+ or Amazon Linux 2
- Node.js 16+ and npm 8+
- nginx
- PM2 (for process management)
- Git

### One-Command Deployment
```bash
chmod +x deployment/scripts/setup.sh
sudo ./deployment/scripts/setup.sh
```

### Manual Deployment Steps

#### 1. System Setup
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js and npm
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2 globally
sudo npm install -g pm2

# Install nginx
sudo apt install nginx -y
```

#### 2. Application Setup
```bash
# Clone and setup
git clone <your-repo-url>
cd powerhouse-crackers-production

# Install backend dependencies
cd backend && npm install
cd ..

# Setup environment
cp .env.example .env.production
# Edit .env.production with your values

# Setup nginx
sudo cp deployment/nginx/powerhouse.conf /etc/nginx/sites-available/
sudo ln -s /etc/nginx/sites-available/powerhouse.conf /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default
```

#### 3. Start Services
```bash
# Start backend with PM2
npm run start

# Start nginx
sudo systemctl start nginx
sudo systemctl enable nginx

# Setup firewall
sudo ufw allow 80
sudo ufw allow 443
sudo ufw allow ssh
sudo ufw --force enable
```

## 📁 Project Structure

```
powerhouse-crackers-production/
├── frontend/                    # Main landing page
├── order-page/                  # Product catalog & ordering
├── backend/                     # API server
├── deployment/                  # Production configs
├── monitoring/                  # Health checks & logs
└── shared/                      # Shared assets
```

## 🔧 Configuration

### Environment Variables
Copy `.env.example` to `.env.production` and configure:

```env
# Server Configuration
NODE_ENV=production
PORT=3000
HOST=0.0.0.0

# Email Configuration (Gmail)
EMAIL_USER=your-business-email@gmail.com
EMAIL_PASS=your-app-password
BUSINESS_EMAIL=orders@powerhousecrackers.com

# Domain Configuration
DOMAIN=your-domain.com
SSL_EMAIL=admin@your-domain.com

# Security
CORS_ORIGIN=https://your-domain.com
```

### SSL Certificate (Let's Encrypt)
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

## 📊 Monitoring & Maintenance

### View Logs
```bash
npm run logs              # Application logs
sudo tail -f /var/log/nginx/error.log  # Nginx logs
```

### Monitor Performance
```bash
npm run monitor           # PM2 monitoring dashboard
htop                      # System resources
```

### Backup
```bash
npm run backup           # Backup orders and configuration
```

## 🔄 Updates & Maintenance

### Update Application
```bash
git pull origin main
cd backend && npm install
npm run restart
```

### Health Checks
- Application: http://your-domain.com/api/health
- Frontend: http://your-domain.com
- Order Page: http://your-domain.com/order

## 🆘 Troubleshooting

### Common Issues

**Backend not starting:**
```bash
pm2 logs powerhouse-api
cd backend && npm run dev  # Debug mode
```

**Nginx errors:**
```bash
sudo nginx -t              # Test configuration
sudo systemctl status nginx
```

**SSL issues:**
```bash
sudo certbot renew --dry-run
```

## 📞 Support

- **Technical Support**: Your development team
- **Business Support**: +91 7904399942
- **Email**: powerhouse.org.in@gmail.com

## 🔐 Security Features

- ✅ HTTPS/SSL encryption
- ✅ Input validation & sanitization
- ✅ Rate limiting
- ✅ CORS protection
- ✅ Environment variable security
- ✅ PM2 process isolation

## 📈 Performance Optimizations

- ✅ Static file caching
- ✅ Gzip compression
- ✅ Image optimization
- ✅ CDN-ready architecture
- ✅ Database query optimization
