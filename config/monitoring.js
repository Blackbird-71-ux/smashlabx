const prometheus = require('prom-client');
const logger = require('./logger');

// Create a Registry to register metrics
const register = new prometheus.Registry();

// Add default metrics (CPU, memory, etc.)
prometheus.collectDefaultMetrics({ register });

// Custom metrics
const httpRequestDurationMicroseconds = new prometheus.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'status_code'],
  buckets: [0.1, 0.5, 1, 2, 5]
});

const activeBookings = new prometheus.Gauge({
  name: 'active_bookings_total',
  help: 'Total number of active bookings'
});

const bookingRequests = new prometheus.Counter({
  name: 'booking_requests_total',
  help: 'Total number of booking requests',
  labelNames: ['status']
});

// Register custom metrics
register.registerMetric(httpRequestDurationMicroseconds);
register.registerMetric(activeBookings);
register.registerMetric(bookingRequests);

// Middleware to track request duration
const requestDurationMiddleware = (req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    httpRequestDurationMicroseconds
      .labels(req.method, req.route?.path || req.path, res.statusCode.toString())
      .observe(duration / 1000);
  });
  next();
};

// Function to update active bookings count
const updateActiveBookings = async (db) => {
  try {
    const result = await db.query(
      'SELECT COUNT(*) FROM bookings WHERE status = $1',
      ['confirmed']
    );
    activeBookings.set(parseInt(result.rows[0].count));
  } catch (error) {
    logger.error('Error updating active bookings metric:', error);
  }
};

module.exports = {
  register,
  requestDurationMiddleware,
  updateActiveBookings,
  bookingRequests
}; 