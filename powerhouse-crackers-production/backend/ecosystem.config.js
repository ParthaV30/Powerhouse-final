module.exports = {
  apps: [{
    name: 'powerhouse-api',
    script: 'server.js',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'development',
      PORT: 3000
    },
    env_production: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    // Logging
    log_file: '../logs/combined.log',
    out_file: '../logs/out.log',
    error_file: '../logs/error.log',
    log_date_format: 'YYYY-MM-DD HH:mm Z',

    // Monitoring
    monitoring: false,

    // Restart conditions
    max_memory_restart: '500M',
    restart_delay: 4000,
    max_restarts: 10,
    min_uptime: '10s',

    // Auto restart on file changes (disable in production)
    watch: false,
    ignore_watch: ['node_modules', 'logs', 'data'],

    // Advanced settings
    kill_timeout: 1600,
    wait_ready: true,
    listen_timeout: 3000
  }]
};
