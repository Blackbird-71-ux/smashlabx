import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { Pool } from 'pg';
import authRoutes from './routes/auth.js';
import bookingRoutes from './routes/bookings.js';

// Load environment variables
dotenv.config();

// Database configuration
const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'smashlabs',
  password: process.env.DB_PASSWORD || 'postgres',
  port: parseInt(process.env.DB_PORT || '5432'),
});

const app = express();

// Middleware
app.use(helmet()); // Security headers
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON bodies

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Corporate Packages endpoint
app.get('/api/packages', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT p.*, 
        json_agg(json_build_object(
          'id', f.id,
          'feature_name', f.feature_name,
          'description', f.description
        )) as features
      FROM corporate_packages p
      LEFT JOIN package_features f ON p.id = f.package_id
      WHERE p.is_active = true
      GROUP BY p.id
      ORDER BY p.base_price ASC
    `);
    
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching packages:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Available Slots endpoint
app.get('/api/slots', async (req, res) => {
  try {
    const { date } = req.query;
    
    if (!date) {
      return res.status(400).json({ error: 'Date parameter is required' });
    }

    const result = await pool.query(
      `SELECT * FROM available_slots 
       WHERE date = $1 AND is_available = true
       ORDER BY time_slot ASC`,
      [date]
    );
    
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching slots:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something broke!' });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 