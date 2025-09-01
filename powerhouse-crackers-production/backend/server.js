const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const slowDown = require('express-slow-down');
const compression = require('compression');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const fs = require('fs').promises;
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const moment = require('moment');
const Joi = require('joi');
const morgan = require('morgan');
const winston = require('winston');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '0.0.0.0';

// Enhanced logging setup
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: { service: 'powerhouse-api' },
  transports: [
    new winston.transports.File({ filename: '../logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: '../logs/combined.log' }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'"]
    }
  },
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  }
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: (process.env.RATE_LIMIT_WINDOW || 15) * 60 * 1000,
  max: process.env.RATE_LIMIT_MAX_REQUESTS || 100,
  message: {
    error: 'Too many requests, please try again later.',
    retryAfter: 'Please wait before making another request.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Speed limiting for order endpoints
const orderSpeedLimiter = slowDown({
  windowMs: 15 * 60 * 1000, // 15 minutes
  delayAfter: 5, // allow 5 requests per 15 minutes at full speed
  delayMs: 500, // slow down subsequent requests by 500ms per request
  maxDelayMs: 20000, // maximum delay of 20 seconds
});

// CORS configuration
const corsOptions = {
  origin: process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : ['http://localhost:3000'],
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

// Middleware stack
app.use(cors(corsOptions));
app.use(limiter);
app.use(compression());
app.use(morgan('combined', { stream: { write: message => logger.info(message.trim()) } }));
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

// Trust proxy for accurate IP addresses
app.set('trust proxy', 1);

// Email configuration with retry logic
const createTransporter = () => {
  return nodemailer.createTransporter({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    },
    pool: true,
    maxConnections: 5,
    maxMessages: 100,
    rateDelta: 1000,
    rateLimit: 5
  });
};

let transporter;
try {
  transporter = createTransporter();
  logger.info('Email transporter configured successfully');
} catch (error) {
  logger.error('Failed to configure email transporter:', error);
}

// Create orders directory if it doesn't exist
const ordersDir = path.join(__dirname, 'data', 'orders');
async function ensureOrdersDir() {
  try {
    await fs.access(ordersDir);
  } catch {
    await fs.mkdir(ordersDir, { recursive: true });
    logger.info('Created orders directory');
  }
}

// Enhanced order validation schema
const orderSchema = Joi.object({
  customer: Joi.object({
    name: Joi.string().min(2).max(100).required(),
    phone: Joi.string().pattern(/^[6-9]\d{9}$/).required(),
    email: Joi.string().email().optional().allow(''),
    address: Joi.string().min(10).max(500).required(),
    city: Joi.string().min(2).max(100).required(),
    pincode: Joi.string().pattern(/^[1-9]\d{5}$/).required()
  }).required(),
  items: Joi.array().items(
    Joi.object({
      name: Joi.string().required(),
      content: Joi.string().required(),
      quantity: Joi.number().integer().min(1).max(100).required(),
      actual_price: Joi.number().positive().required(),
      discount_price: Joi.number().positive().required(),
      total: Joi.number().positive().required()
    })
  ).min(1).required(),
  paymentMethod: Joi.string().valid('Google Pay', 'Bank Transfer').default('Google Pay'),
  notes: Joi.string().max(1000).optional().allow('')
});

// Helper function to save order with error handling
async function saveOrder(order) {
  try {
    await ensureOrdersDir();
    const filename = `order_${order.orderId}_${moment().format('YYYY-MM-DD')}.json`;
    const filepath = path.join(ordersDir, filename);
    await fs.writeFile(filepath, JSON.stringify(order, null, 2));
    logger.info(`Order saved: ${order.orderId}`);
    return filepath;
  } catch (error) {
    logger.error('Error saving order:', error);
    throw new Error('Failed to save order');
  }
}

// Helper function to get all orders with pagination
async function getAllOrders(page = 1, limit = 50) {
  try {
    await ensureOrdersDir();
    const files = await fs.readdir(ordersDir);
    const orders = [];

    for (const file of files) {
      if (file.endsWith('.json')) {
        try {
          const content = await fs.readFile(path.join(ordersDir, file), 'utf8');
          orders.push(JSON.parse(content));
        } catch (parseError) {
          logger.error(`Error parsing order file ${file}:`, parseError);
        }
      }
    }

    const sortedOrders = orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    return {
      orders: sortedOrders.slice(startIndex, endIndex),
      total: sortedOrders.length,
      page,
      totalPages: Math.ceil(sortedOrders.length / limit)
    };
  } catch (error) {
    logger.error('Error reading orders:', error);
    return { orders: [], total: 0, page: 1, totalPages: 0 };
  }
}

// Enhanced email templates with better formatting
function createBusinessEmailTemplate(order) {
  const itemsList = order.items.map(item => 
    `<tr>
      <td style="padding: 8px; border: 1px solid #ddd;">${item.name}</td>
      <td style="padding: 8px; border: 1px solid #ddd; text-align: center;">${item.quantity}</td>
      <td style="padding: 8px; border: 1px solid #ddd; text-align: right;">₹${item.actual_price}</td>
      <td style="padding: 8px; border: 1px solid #ddd; text-align: right;">₹${item.discount_price}</td>
      <td style="padding: 8px; border: 1px solid #ddd; text-align: right;">₹${item.total}</td>
    </tr>`
  ).join('');

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>New Order - Powerhouse Crackers</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 800px; margin: 0 auto; padding: 20px;">

      <div style="background: linear-gradient(135deg, #FF6B35, #DC143C); color: white; padding: 20px; text-align: center; border-radius: 10px;">
        <h1 style="margin: 0; font-size: 24px;">🎆 NEW ORDER - POWERHOUSE CRACKERS 🎆</h1>
        <p style="margin: 10px 0 0 0; font-size: 18px;">Order ID: <strong>${order.orderId}</strong></p>
        <p style="margin: 5px 0 0 0;">Date: ${moment(order.createdAt).format('DD/MM/YYYY hh:mm A')}</p>
      </div>

      <div style="background: #f9f9f9; padding: 20px; margin: 20px 0; border-radius: 10px;">
        <h2 style="color: #FF6B35; margin-top: 0;">Customer Information</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 5px; font-weight: bold;">Name:</td><td style="padding: 5px;">${order.customer.name}</td></tr>
          <tr><td style="padding: 5px; font-weight: bold;">Phone:</td><td style="padding: 5px;">${order.customer.phone}</td></tr>
          <tr><td style="padding: 5px; font-weight: bold;">Email:</td><td style="padding: 5px;">${order.customer.email || 'Not provided'}</td></tr>
          <tr><td style="padding: 5px; font-weight: bold;">Address:</td><td style="padding: 5px;">${order.customer.address}</td></tr>
          <tr><td style="padding: 5px; font-weight: bold;">City:</td><td style="padding: 5px;">${order.customer.city}</td></tr>
          <tr><td style="padding: 5px; font-weight: bold;">Pincode:</td><td style="padding: 5px;">${order.customer.pincode}</td></tr>
        </table>
      </div>

      <div style="margin: 20px 0;">
        <h2 style="color: #FF6B35;">Order Details</h2>
        <table style="width: 100%; border-collapse: collapse; margin: 10px 0;">
          <thead>
            <tr style="background: #FF6B35; color: white;">
              <th style="padding: 10px; border: 1px solid #ddd;">Product</th>
              <th style="padding: 10px; border: 1px solid #ddd;">Qty</th>
              <th style="padding: 10px; border: 1px solid #ddd;">Original Price</th>
              <th style="padding: 10px; border: 1px solid #ddd;">Discount Price</th>
              <th style="padding: 10px; border: 1px solid #ddd;">Total</th>
            </tr>
          </thead>
          <tbody>
            ${itemsList}
            <tr style="background: #f0f0f0; font-weight: bold;">
              <td colspan="4" style="padding: 10px; border: 1px solid #ddd; text-align: right;">Grand Total:</td>
              <td style="padding: 10px; border: 1px solid #ddd; text-align: right;">₹${order.grandTotal}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div style="background: #e8f4f8; padding: 20px; margin: 20px 0; border-radius: 10px;">
        <h3 style="color: #DC143C; margin-top: 0;">Payment Information</h3>
        <p><strong>Payment Method:</strong> ${order.paymentMethod}</p>
        <p><strong>Payment Status:</strong> Pending</p>
        ${order.notes ? `<p><strong>Customer Notes:</strong> ${order.notes}</p>` : ''}
      </div>

      <div style="background: #fff3cd; padding: 20px; margin: 20px 0; border-radius: 10px; border-left: 5px solid #ffc107;">
        <h3 style="color: #856404; margin-top: 0;">⚡ ACTION REQUIRED:</h3>
        <ol style="margin: 0; padding-left: 20px;">
          <li>Contact customer at <strong>${order.customer.phone}</strong> to confirm order</li>
          <li>Verify payment (Google Pay: ${process.env.GOOGLE_PAY_NUMBER || '7904399942'} or Bank Transfer)</li>
          <li>Arrange delivery to <strong>${order.customer.address}</strong></li>
          <li>Update order status in system</li>
        </ol>
      </div>

      <div style="text-align: center; margin: 30px 0; padding: 20px; background: #f8f9fa; border-radius: 10px;">
        <p style="margin: 0; color: #6c757d;">This is an automated notification from Powerhouse Crackers Order Management System</p>
        <p style="margin: 5px 0 0 0; color: #6c757d;">Generated on ${moment().format('DD/MM/YYYY hh:mm A')}</p>
      </div>
    </body>
    </html>
  `;
}

function createCustomerEmailTemplate(order) {
  const itemsList = order.items.map(item => 
    `<tr>
      <td style="padding: 8px; border: 1px solid #ddd;">${item.name}</td>
      <td style="padding: 8px; border: 1px solid #ddd; text-align: center;">${item.quantity}</td>
      <td style="padding: 8px; border: 1px solid #ddd; text-align: right;">₹${item.discount_price}</td>
      <td style="padding: 8px; border: 1px solid #ddd; text-align: right;">₹${item.total}</td>
    </tr>`
  ).join('');

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Order Confirmed - Powerhouse Crackers</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 800px; margin: 0 auto; padding: 20px;">

      <div style="background: linear-gradient(135deg, #FF6B35, #DC143C); color: white; padding: 20px; text-align: center; border-radius: 10px;">
        <h1 style="margin: 0; font-size: 24px;">🎆 ORDER CONFIRMED - POWERHOUSE CRACKERS 🎆</h1>
        <p style="margin: 10px 0 0 0; font-size: 18px;">Thank you for your order, <strong>${order.customer.name}!</strong></p>
        <p style="margin: 5px 0 0 0;">Order ID: <strong>${order.orderId}</strong></p>
      </div>

      <div style="margin: 20px 0;">
        <h2 style="color: #FF6B35;">Your Order Summary</h2>
        <table style="width: 100%; border-collapse: collapse; margin: 10px 0;">
          <thead>
            <tr style="background: #FF6B35; color: white;">
              <th style="padding: 10px; border: 1px solid #ddd;">Product</th>
              <th style="padding: 10px; border: 1px solid #ddd;">Quantity</th>
              <th style="padding: 10px; border: 1px solid #ddd;">Price</th>
              <th style="padding: 10px; border: 1px solid #ddd;">Total</th>
            </tr>
          </thead>
          <tbody>
            ${itemsList}
            <tr style="background: #f0f0f0; font-weight: bold;">
              <td colspan="3" style="padding: 10px; border: 1px solid #ddd; text-align: right;">Grand Total:</td>
              <td style="padding: 10px; border: 1px solid #ddd; text-align: right;">₹${order.grandTotal}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div style="background: #d4edda; padding: 20px; margin: 20px 0; border-radius: 10px; border-left: 5px solid #28a745;">
        <h3 style="color: #155724; margin-top: 0;">💳 Payment Instructions:</h3>
        <div style="margin: 15px 0;">
          <h4 style="color: #155724; margin: 10px 0;">Google Pay:</h4>
          <p style="margin: 5px 0; font-size: 18px; font-weight: bold;">${process.env.GOOGLE_PAY_NUMBER || '7904399942'}</p>
        </div>
        <div style="margin: 15px 0;">
          <h4 style="color: #155724; margin: 10px 0;">Bank Transfer:</h4>
          <ul style="margin: 5px 0; padding-left: 20px;">
            <li>Account Name: <strong>Powerhouse Crackers</strong></li>
            <li>Bank: <strong>SBI Bank</strong></li>
            <li>Account Number: <strong>${process.env.BANK_ACCOUNT || '33261312190'}</strong></li>
            <li>IFSC Code: <strong>${process.env.BANK_IFSC || 'SBIN0000990'}</strong></li>
            <li>Branch: <strong>CBE City Branch</strong></li>
          </ul>
        </div>
        <p style="background: #fff3cd; padding: 10px; border-radius: 5px; margin: 15px 0;">
          <strong>📱 Note:</strong> Please send payment screenshot to <strong>+91 ${process.env.GOOGLE_PAY_NUMBER || '7904399942'}</strong> after payment.
        </p>
      </div>

      <div style="background: #e8f4f8; padding: 20px; margin: 20px 0; border-radius: 10px;">
        <h3 style="color: #0c5460; margin-top: 0;">🚀 What's Next?</h3>
        <ol style="margin: 0; padding-left: 20px;">
          <li>We will call you at <strong>${order.customer.phone}</strong> to confirm your order</li>
          <li>Complete payment using above methods</li>
          <li>Your order will be prepared and delivered to your address</li>
          <li>Enjoy your Diwali celebrations! 🎆</li>
        </ol>
      </div>

      <div style="text-align: center; margin: 30px 0; padding: 20px; background: #f8f9fa; border-radius: 10px;">
        <h3 style="color: #FF6B35; margin: 0 0 10px 0;">Contact Us</h3>
        <p style="margin: 5px 0;"><strong>📞 Phone:</strong> +91 ${process.env.GOOGLE_PAY_NUMBER || '7904399942'}</p>
        <p style="margin: 5px 0;"><strong>✉️ Email:</strong> ${process.env.BUSINESS_EMAIL || 'powerhouse.org.in@gmail.com'}</p>
        <p style="margin: 15px 0 5px 0; color: #6c757d; font-size: 14px;">Thank you for choosing Powerhouse Crackers!</p>
        <p style="margin: 0; color: #6c757d; font-size: 12px;">Order placed on ${moment().format('DD/MM/YYYY hh:mm A')}</p>
      </div>
    </body>
    </html>
  `;
}

// Enhanced email sending with retry logic
async function sendEmailWithRetry(emailOptions, maxRetries = 3) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      await transporter.sendMail(emailOptions);
      logger.info(`Email sent successfully on attempt ${attempt}`);
      return true;
    } catch (error) {
      logger.error(`Email attempt ${attempt} failed:`, error);
      if (attempt === maxRetries) {
        logger.error('All email attempts failed');
        return false;
      }
      // Wait before retry (exponential backoff)
      await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
    }
  }
  return false;
}

// Routes
app.get('/', (req, res) => {
  res.json({ 
    message: 'Powerhouse Crackers Order System API',
    version: '1.0.0',
    status: 'active',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV
  });
});

// Health check endpoint with detailed info
app.get('/api/health', (req, res) => {
  const healthStatus = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    environment: process.env.NODE_ENV,
    version: '1.0.0',
    services: {
      email: !!transporter,
      fileSystem: true
    }
  };

  res.json(healthStatus);
});

// Submit new order with enhanced validation and error handling
app.post('/api/orders', orderSpeedLimiter, async (req, res) => {
  try {
    // Validate request body
    const { error, value } = orderSchema.validate(req.body);
    if (error) {
      logger.warn('Order validation failed:', error.details);
      return res.status(400).json({ 
        error: 'Validation failed', 
        details: error.details.map(detail => detail.message)
      });
    }

    const { customer, items, paymentMethod, notes } = value;

    // Calculate totals with validation
    const grandTotal = items.reduce((sum, item) => {
      const expectedTotal = item.discount_price * item.quantity;
      if (Math.abs(item.total - expectedTotal) > 0.01) {
        throw new Error(`Invalid total for item: ${item.name}`);
      }
      return sum + item.total;
    }, 0);

    // Create order object
    const order = {
      orderId: `PH${Date.now()}${Math.random().toString(36).substr(2, 4).toUpperCase()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      customer,
      items,
      paymentMethod,
      grandTotal: Math.round(grandTotal * 100) / 100, // Round to 2 decimal places
      status: 'pending',
      notes: notes || '',
      paymentStatus: 'pending',
      ipAddress: req.ip,
      userAgent: req.get('User-Agent')
    };

    // Save order to file
    await saveOrder(order);

    // Send emails asynchronously
    const emailPromises = [];

    // Business email
    if (process.env.BUSINESS_EMAIL && transporter) {
      const businessEmailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.BUSINESS_EMAIL,
        subject: `🎆 New Order #${order.orderId} - ₹${grandTotal}`,
        html: createBusinessEmailTemplate(order)
      };
      emailPromises.push(sendEmailWithRetry(businessEmailOptions));
    }

    // Customer email (if provided)
    if (customer.email && transporter) {
      const customerEmailOptions = {
        from: process.env.EMAIL_USER,
        to: customer.email,
        subject: `Order Confirmed #${order.orderId} - Powerhouse Crackers`,
        html: createCustomerEmailTemplate(order)
      };
      emailPromises.push(sendEmailWithRetry(customerEmailOptions));
    }

    // Send emails without waiting (fire and forget)
    Promise.all(emailPromises).catch(err => 
      logger.error('Error sending emails:', err)
    );

    // Log successful order
    logger.info(`Order created: ${order.orderId}, Customer: ${customer.name}, Total: ₹${grandTotal}`);

    res.status(201).json({
      success: true,
      message: 'Order placed successfully',
      orderId: order.orderId,
      grandTotal: order.grandTotal,
      timestamp: order.createdAt
    });

  } catch (error) {
    logger.error('Error processing order:', error);
    res.status(500).json({ 
      error: 'Internal server error', 
      message: 'Failed to process order',
      timestamp: new Date().toISOString()
    });
  }
});

// Get all orders with pagination (for admin)
app.get('/api/orders', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 50;
    const result = await getAllOrders(page, limit);

    res.json({
      success: true,
      ...result
    });
  } catch (error) {
    logger.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

// Get specific order
app.get('/api/orders/:orderId', async (req, res) => {
  try {
    const { orderId } = req.params;
    const { orders } = await getAllOrders(1, 1000); // Get all orders for search
    const order = orders.find(o => o.orderId === orderId);

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json({ success: true, order });
  } catch (error) {
    logger.error('Error fetching order:', error);
    res.status(500).json({ error: 'Failed to fetch order' });
  }
});

// Update order status
app.patch('/api/orders/:orderId', async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status, paymentStatus, notes } = req.body;

    const { orders } = await getAllOrders(1, 1000);
    const orderIndex = orders.findIndex(o => o.orderId === orderId);

    if (orderIndex === -1) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // Update order
    if (status) orders[orderIndex].status = status;
    if (paymentStatus) orders[orderIndex].paymentStatus = paymentStatus;
    if (notes) orders[orderIndex].notes = notes;
    orders[orderIndex].updatedAt = new Date().toISOString();

    // Save updated order
    await saveOrder(orders[orderIndex]);

    logger.info(`Order updated: ${orderId}, Status: ${status}, Payment: ${paymentStatus}`);

    res.json({ 
      success: true, 
      message: 'Order updated successfully',
      order: orders[orderIndex]
    });
  } catch (error) {
    logger.error('Error updating order:', error);
    res.status(500).json({ error: 'Failed to update order' });
  }
});

// Search orders
app.get('/api/orders/search/:query', async (req, res) => {
  try {
    const { query } = req.params;
    const { orders } = await getAllOrders(1, 1000);

    const filteredOrders = orders.filter(order => 
      order.orderId.toLowerCase().includes(query.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(query.toLowerCase()) ||
      order.customer.phone.includes(query) ||
      (order.customer.email && order.customer.email.toLowerCase().includes(query.toLowerCase()))
    );

    res.json({
      success: true,
      orders: filteredOrders,
      total: filteredOrders.length
    });
  } catch (error) {
    logger.error('Error searching orders:', error);
    res.status(500).json({ error: 'Failed to search orders' });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  logger.error('Unhandled error:', err);
  res.status(500).json({
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'production' ? 'Something went wrong' : err.message,
    timestamp: new Date().toISOString()
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Route not found',
    message: `The requested route ${req.originalUrl} was not found`,
    timestamp: new Date().toISOString()
  });
});

// Graceful shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM received, shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', () => {
  logger.info('SIGINT received, shutting down gracefully');
  process.exit(0);
});

// Start server
const server = app.listen(PORT, HOST, () => {
  logger.info(`🎆 Powerhouse Crackers Order System running on ${HOST}:${PORT}`);
  logger.info(`🌐 Environment: ${process.env.NODE_ENV}`);
  logger.info(`📧 Email configured: ${!!process.env.EMAIL_USER}`);
  logger.info(`🔒 Security features enabled`);

  // Send ready signal to PM2
  if (process.send) {
    process.send('ready');
  }
});

// Handle server errors
server.on('error', (error) => {
  logger.error('Server error:', error);
});

module.exports = app;
