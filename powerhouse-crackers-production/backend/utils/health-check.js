const http = require('http');
const fs = require('fs').promises;
const path = require('path');

class HealthChecker {
  constructor(options = {}) {
    this.port = options.port || process.env.PORT || 3000;
    this.host = options.host || 'localhost';
    this.timeout = options.timeout || 5000;
    this.logFile = options.logFile || path.join(__dirname, '..', '..', 'logs', 'health.log');
  }

  async checkAPI() {
    return new Promise((resolve, reject) => {
      const req = http.get(`http://${this.host}:${this.port}/api/health`, {
        timeout: this.timeout
      }, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          try {
            const healthData = JSON.parse(data);
            resolve({
              status: res.statusCode === 200 ? 'healthy' : 'unhealthy',
              statusCode: res.statusCode,
              response: healthData,
              timestamp: new Date().toISOString()
            });
          } catch (error) {
            reject(new Error(`Invalid response: ${error.message}`));
          }
        });
      });

      req.on('timeout', () => {
        req.abort();
        reject(new Error('Health check timeout'));
      });

      req.on('error', (error) => {
        reject(error);
      });
    });
  }

  async checkFileSystem() {
    try {
      const ordersDir = path.join(__dirname, '..', 'data', 'orders');
      await fs.access(ordersDir);
      const files = await fs.readdir(ordersDir);

      return {
        status: 'healthy',
        ordersDirectory: 'accessible',
        orderCount: files.filter(f => f.endsWith('.json')).length,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      return {
        status: 'unhealthy',
        error: error.message,
        timestamp: new Date().toISOString()
      };
    }
  }

  async performFullCheck() {
    const results = {
      timestamp: new Date().toISOString(),
      overall: 'healthy',
      checks: {}
    };

    try {
      // API Health Check
      results.checks.api = await this.checkAPI();
    } catch (error) {
      results.checks.api = {
        status: 'unhealthy',
        error: error.message,
        timestamp: new Date().toISOString()
      };
      results.overall = 'unhealthy';
    }

    // File System Check
    results.checks.filesystem = await this.checkFileSystem();
    if (results.checks.filesystem.status === 'unhealthy') {
      results.overall = 'unhealthy';
    }

    // Memory Check
    const memUsage = process.memoryUsage();
    results.checks.memory = {
      status: memUsage.heapUsed < 500 * 1024 * 1024 ? 'healthy' : 'warning', // 500MB threshold
      usage: memUsage,
      timestamp: new Date().toISOString()
    };

    await this.logResults(results);
    return results;
  }

  async logResults(results) {
    try {
      const logEntry = `${results.timestamp} - Overall: ${results.overall}\n`;
      await fs.appendFile(this.logFile, logEntry);
    } catch (error) {
      console.error('Failed to write health log:', error);
    }
  }
}

// CLI usage
if (require.main === module) {
  const checker = new HealthChecker();
  checker.performFullCheck()
    .then(results => {
      console.log(JSON.stringify(results, null, 2));
      process.exit(results.overall === 'healthy' ? 0 : 1);
    })
    .catch(error => {
      console.error('Health check failed:', error);
      process.exit(1);
    });
}

module.exports = HealthChecker;
