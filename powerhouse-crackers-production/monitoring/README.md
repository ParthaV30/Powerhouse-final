# Powerhouse Crackers - Monitoring Configuration

## Health Check Endpoints

### Application Health
- **Frontend**: https://your-domain.com
- **Order Page**: https://your-domain.com/order  
- **API**: https://your-domain.com/api/health

### Monitoring Services

#### 1. Application Monitoring
```bash
# Check API health
curl https://your-domain.com/api/health

# Expected response:
{
  "status": "healthy",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "uptime": 3600,
  "memory": {...},
  "environment": "production",
  "version": "1.0.0",
  "services": {
    "email": true,
    "fileSystem": true
  }
}
```

#### 2. Performance Monitoring
```bash
# Check response times
curl -w "@curl-format.txt" -o /dev/null -s https://your-domain.com/api/health

# Monitor memory usage
pm2 monit
```

#### 3. Log Monitoring
```bash
# Application logs
tail -f /var/www/powerhouse-crackers/logs/combined.log

# Error logs
tail -f /var/www/powerhouse-crackers/logs/error.log

# Nginx logs
tail -f /var/log/nginx/powerhouse.error.log
```

## Alerts Configuration

### Email Alerts
Configure alerts for:
- Application downtime
- High error rates
- Memory usage > 80%
- Disk space < 20%

### SMS Alerts (Optional)
For critical issues:
- Complete service outage
- Payment system failures
- Security incidents

## Backup Monitoring

### Automated Backups
- **Daily**: Order data backup at 2:00 AM
- **Weekly**: Full system backup on Sundays
- **Monthly**: Long-term archive backup

### Backup Verification
```bash
# Verify latest backup
ls -la /var/backups/powerhouse/

# Test backup integrity
tar -tzf /var/backups/powerhouse/latest-backup.tar.gz
```

## Performance Benchmarks

### Target Metrics
- **Page Load Time**: < 3 seconds
- **API Response Time**: < 500ms
- **Uptime**: > 99.9%
- **Error Rate**: < 0.1%

### Monitoring Tools
- **Uptime**: UptimeRobot or Pingdom
- **Performance**: Google PageSpeed Insights
- **Analytics**: Google Analytics
- **Error Tracking**: Sentry (optional)
