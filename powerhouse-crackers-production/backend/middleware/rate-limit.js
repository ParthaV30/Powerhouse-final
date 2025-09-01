const rateLimit = require('express-rate-limit');
const slowDown = require('express-slow-down');

// General API rate limiting
const createGeneralLimiter = () => rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: {
    error: 'Too many requests from this IP, please try again later.',
    retryAfter: Math.ceil(15 * 60 / 60) + ' minutes'
  },
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req) => {
    // Skip rate limiting for health checks
    return req.path === '/api/health';
  }
});

// Strict rate limiting for order endpoints
const createOrderLimiter = () => rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 5, // Limit each IP to 5 order requests per 10 minutes
  message: {
    error: 'Too many orders from this IP, please wait before placing another order.',
    retryAfter: '10 minutes'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Speed limiting for order endpoints
const createOrderSpeedLimiter = () => slowDown({
  windowMs: 15 * 60 * 1000, // 15 minutes
  delayAfter: 3, // Allow 3 requests per 15 minutes at full speed
  delayMs: 500, // Slow down subsequent requests by 500ms per request
  maxDelayMs: 20000, // Maximum delay of 20 seconds
});

// Admin endpoints rate limiting
const createAdminLimiter = () => rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 50, // Limit admin operations
  message: {
    error: 'Too many admin requests, please try again later.',
    retryAfter: '5 minutes'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = {
  generalLimiter: createGeneralLimiter(),
  orderLimiter: createOrderLimiter(),
  orderSpeedLimiter: createOrderSpeedLimiter(),
  adminLimiter: createAdminLimiter()
};
