# 🎆 POWERHOUSE CRACKERS - PRODUCTION DEPLOYMENT GUIDE

## 🚀 ONE-COMMAND DEPLOYMENT

For a fresh Ubuntu 20.04+ server:

```bash
# Download and extract
wget https://your-repo-url/powerhouse-crackers-production.zip
unzip powerhouse-crackers-production.zip
cd powerhouse-crackers-production

# Deploy (run as root)
sudo chmod +x deployment/scripts/deploy.sh
sudo ./deployment/scripts/deploy.sh
```

## 📋 DEPLOYMENT CHECKLIST

### Before Deployment
- [ ] Fresh Ubuntu 20.04+ server
- [ ] Domain name pointed to server IP
- [ ] Gmail app password generated
- [ ] SSL email address ready

### After Deployment
- [ ] Configure `.env.production` file
- [ ] Test all endpoints
- [ ] Verify SSL certificate
- [ ] Set up monitoring
- [ ] Configure backups

## 🔧 MANUAL CONFIGURATION

### 1. Environment Variables
Edit `/var/www/powerhouse-crackers/backend/.env.production`:

```env
# REQUIRED - Configure these before starting
NODE_ENV=production
PORT=3000
HOST=0.0.0.0

# Email Configuration (Gmail)
EMAIL_USER=your-business-email@gmail.com
EMAIL_PASS=your-16-character-app-password
BUSINESS_EMAIL=orders@powerhousecrackers.com

# Domain Configuration
DOMAIN=your-actual-domain.com
SSL_EMAIL=admin@your-domain.com

# Security
CORS_ORIGIN=https://your-actual-domain.com
JWT_SECRET=generate-a-secure-random-string-here
SESSION_SECRET=generate-another-secure-random-string-here
```

### 2. Domain Configuration
```bash
# Update nginx configuration with your domain
sudo sed -i 's/your-domain.com/youractualdomain.com/g' /etc/nginx/sites-available/powerhouse.conf
sudo systemctl reload nginx
```

### 3. SSL Certificate
```bash
# Install SSL certificate
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

## 🎯 KEY FEATURES

### Frontend Features
- ✅ Responsive dark theme design
- ✅ Mobile-friendly navigation
- ✅ Contact form with validation
- ✅ SEO optimized
- ✅ Performance optimized

### E-commerce Features
- ✅ 300+ products across 10+ categories
- ✅ Advanced search and filtering
- ✅ Shopping cart with persistence
- ✅ Coupon system (PR20, PR10, PR5)
- ✅ PDF quotation generation
- ✅ WhatsApp integration
- ✅ Mobile responsive design

### Backend Features
- ✅ Production-ready API
- ✅ Email notifications
- ✅ Order management
- ✅ Security middleware
- ✅ Rate limiting
- ✅ Error handling
- ✅ Health monitoring

### Deployment Features
- ✅ PM2 process management
- ✅ Nginx reverse proxy
- ✅ SSL/HTTPS support
- ✅ Automated backups
- ✅ Log rotation
- ✅ Health checks
- ✅ Security hardening

## 📊 MONITORING

### Check Application Status
```bash
# Application health
curl https://yourdomain.com/api/health

# PM2 status
pm2 status

# View logs
pm2 logs powerhouse-api

# Monitor performance
pm2 monit
```

### Performance Benchmarks
- **Page Load**: < 3 seconds
- **API Response**: < 500ms
- **Uptime**: > 99.9%
- **Mobile Score**: > 90/100

## 🔒 SECURITY FEATURES

- ✅ HTTPS/SSL encryption
- ✅ Input validation & sanitization
- ✅ Rate limiting (100 req/15min)
- ✅ CORS protection
- ✅ Security headers (Helmet.js)
- ✅ Environment variable security
- ✅ Firewall configuration
- ✅ Fail2ban protection

## 💾 BACKUP SYSTEM

### Automated Backups
- **Daily**: Order data at 2:00 AM
- **Weekly**: Full system backup
- **Retention**: 30 days local, 90 days archive

### Manual Backup
```bash
# Create backup
/usr/local/bin/powerhouse-backup

# View backups
ls -la /var/backups/powerhouse/
```

## 🛠️ MAINTENANCE

### Update Application
```bash
cd /var/www/powerhouse-crackers
git pull origin main
cd backend && npm install
pm2 restart powerhouse-api
```

### Monitor Logs
```bash
# Application logs
tail -f /var/www/powerhouse-crackers/logs/combined.log

# Error logs  
tail -f /var/www/powerhouse-crackers/logs/error.log

# Nginx logs
tail -f /var/log/nginx/powerhouse.error.log
```

### SSL Renewal
```bash
# Test renewal
sudo certbot renew --dry-run

# Renew certificates
sudo certbot renew
```

## 🆘 TROUBLESHOOTING

### Common Issues

**Application not starting:**
```bash
cd /var/www/powerhouse-crackers/backend
pm2 logs powerhouse-api
npm run dev  # Debug mode
```

**Nginx errors:**
```bash
sudo nginx -t
sudo systemctl status nginx
sudo systemctl restart nginx
```

**SSL issues:**
```bash
sudo certbot certificates
sudo certbot renew --force-renewal
```

**Email not sending:**
- Verify Gmail app password
- Check firewall settings
- Test SMTP connection

### Performance Issues
```bash
# Check memory usage
free -h
pm2 monit

# Check disk space
df -h

# Check CPU usage
htop
```

## 📞 SUPPORT

### Technical Support
- **Documentation**: This README
- **Logs**: Check application and server logs
- **Health Check**: https://yourdomain.com/api/health

### Business Support
- **Phone**: +91 7904399942
- **Email**: powerhouse.org.in@gmail.com
- **WhatsApp**: Available for order inquiries

## 🎉 POST-DEPLOYMENT

After successful deployment:

1. **Test the website**: Visit https://yourdomain.com
2. **Test ordering**: Visit https://yourdomain.com/order
3. **Place test order**: Verify email notifications work
4. **Check mobile**: Test responsive design
5. **Monitor performance**: Use Google PageSpeed Insights
6. **Set up monitoring**: Configure uptime monitoring
7. **Backup verification**: Ensure backups are working

## 📈 SCALING

For high traffic scenarios:

### Horizontal Scaling
- Load balancer (Nginx/HAProxy)
- Multiple backend instances
- Database clustering
- CDN integration

### Performance Optimization
- Redis caching
- Database optimization
- Image optimization
- Code splitting

### Monitoring & Analytics
- Application Performance Monitoring (APM)
- Error tracking (Sentry)
- User analytics (Google Analytics)
- Business intelligence dashboards

---

**🎆 Congratulations! Your Powerhouse Crackers platform is ready for production! 🎆**

For any issues or questions, refer to the troubleshooting section or check the application logs.
