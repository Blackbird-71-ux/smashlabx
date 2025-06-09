const express = require('express');
const router = express.Router();
const db = require('../config/database');
const { redisClient } = require('../config/database');
const { sendBookingConfirmation } = require('../utils/email'); // Import the email utility

// Get available time slots
router.get('/slots', async (req, res) => {
  try {
    const { date } = req.query;
    
    // Check Redis cache first
    const cachedSlots = await redisClient.get(`slots:${date}`);
    if (cachedSlots) {
      return res.json(JSON.parse(cachedSlots));
    }
    
    // Get from database if not in cache
    const result = await db.query(
      `SELECT time_slot, is_available 
       FROM available_slots 
       WHERE date = $1 AND is_available = true`,
      [date]
    );
    
    // Cache the results
    await redisClient.set(`slots:${date}`, JSON.stringify(result.rows), {
      EX: 3600 // Cache for 1 hour
    });
    
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching available slots' });
  }
});

// Create new booking
router.post('/', async (req, res) => {
  try {
    const { clientId, date, timeSlot, packageType, participants } = req.body;
    
    // Start transaction
    await db.query('BEGIN');
    
    // Check availability
    const availabilityCheck = await db.query(
      `SELECT is_available FROM available_slots 
       WHERE date = $1 AND time_slot = $2`,
      [date, timeSlot]
    );
    
    if (!availabilityCheck.rows[0]?.is_available) {
      await db.query('ROLLBACK');
      return res.status(400).json({ message: 'Slot not available' });
    }
    
    // Create booking
    const bookingResult = await db.query(
      `INSERT INTO bookings (client_id, date, time_slot, package_type, participants)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id`,
      [clientId, date, timeSlot, packageType, participants]
    );

    // Get client email for confirmation
    const clientInfo = await db.query(
      'SELECT email, company_name FROM corporate_clients WHERE id = $1',
      [clientId]
    );
    const clientEmail = clientInfo.rows[0]?.email;
    const companyName = clientInfo.rows[0]?.company_name;
    
    // Update availability
    await db.query(
      `UPDATE available_slots 
       SET is_available = false 
       WHERE date = $1 AND time_slot = $2`,
      [date, timeSlot]
    );
    
    // Clear cache
    await redisClient.del(`slots:${date}`);
    
    await db.query('COMMIT');

    // Send booking confirmation email
    if (clientEmail) {
      await sendBookingConfirmation(clientEmail, { date, timeSlot, packageType, participants, companyName });
    }
    
    res.status(201).json({ 
      bookingId: bookingResult.rows[0].id,
      message: 'Booking created successfully'
    });
  } catch (error) {
    await db.query('ROLLBACK');
    console.error(error);
    res.status(500).json({ message: 'Error creating booking' });
  }
});

// Get client's bookings
router.get('/client/:clientId', async (req, res) => {
  try {
    const { clientId } = req.params;
    
    const result = await db.query(
      `SELECT * FROM bookings 
       WHERE client_id = $1 
       ORDER BY date DESC, time_slot ASC`,
      [clientId]
    );
    
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching bookings' });
  }
});

module.exports = router; 