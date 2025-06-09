const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');
const path = require('path');
const logger = require('./config/logger'); // Import the logger
const { register, requestDurationMiddleware, updateActiveBookings } = require('./config/monitoring');
const db = require('./config/database');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestDurationMiddleware);

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', uptime: process.uptime() });
});

// Metrics endpoint for Prometheus
app.get('/metrics', async (req, res) => {
  try {
    await updateActiveBookings(db);
    res.set('Content-Type', register.contentType);
    res.end(await register.metrics());
  } catch (error) {
    logger.error('Error generating metrics:', error);
    res.status(500).end();
  }
});

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/bookings', require('./routes/bookings'));
app.use('/api/corporate', require('./routes/corporate'));
app.use('/api/payments', require('./routes/payments'));

// Error handling middleware
app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
}); 