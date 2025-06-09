import express from 'express';
import { db } from '../config/database.js';
import { sendBookingConfirmation } from '../utils/email.js';

const router = express.Router();

// Get available time slots for a date
router.get('/slots', async (req, res) => {
  try {
    const { date } = req.query;
    
    if (!date) {
      return res.status(400).json({ error: 'Date parameter is required' });
    }

    const result = await db.query(
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

// Create a new booking
router.post('/', async (req, res) => {
  try {
    const { client_id, date, time_slot, package_type, participants } = req.body;

    // Check if slot is available
    const slotResult = await db.query(
      `SELECT * FROM available_slots 
       WHERE date = $1 AND time_slot = $2 AND is_available = true`,
      [date, time_slot]
    );

    if (slotResult.rows.length === 0) {
      return res.status(400).json({ error: 'Selected time slot is not available' });
    }

    // Get package price
    const packageResult = await db.query(
      'SELECT base_price FROM corporate_packages WHERE name = $1',
      [package_type]
    );

    if (packageResult.rows.length === 0) {
      return res.status(400).json({ error: 'Invalid package type' });
    }

    const basePrice = packageResult.rows[0].base_price;
    const totalAmount = basePrice * participants;

    // Create booking
    const bookingResult = await db.query(
      `INSERT INTO bookings 
       (client_id, date, time_slot, package_type, participants, total_amount)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [client_id, date, time_slot, package_type, participants, totalAmount]
    );

    // Mark slot as unavailable
    await db.query(
      `UPDATE available_slots 
       SET is_available = false 
       WHERE date = $1 AND time_slot = $2`,
      [date, time_slot]
    );

    // Send confirmation email
    await sendBookingConfirmation({
      bookingId: bookingResult.rows[0].id,
      date,
      timeSlot: time_slot,
      packageType: package_type,
      participants,
      totalAmount
    });

    res.status(201).json({
      message: 'Booking created successfully',
      booking: bookingResult.rows[0]
    });
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ error: 'Error creating booking' });
  }
});

// Get client's bookings
router.get('/client/:clientId', async (req, res) => {
  try {
    const { clientId } = req.params;

    const result = await db.query(
      `SELECT b.*, p.name as package_name, p.description as package_description
       FROM bookings b
       JOIN corporate_packages p ON b.package_type = p.name
       WHERE b.client_id = $1
       ORDER BY b.date DESC, b.time_slot ASC`,
      [clientId]
    );

    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ error: 'Error fetching bookings' });
  }
});

export default router; 