import express from 'express';
import { query, redisClient } from '../config/database.js';
import { z } from 'zod';
import { sendBookingConfirmation } from '../utils/email.js';

const router = express.Router();

// Validation schemas
const bookingSchema = z.object({
  clientId: z.number(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  timeSlot: z.string().regex(/^\d{2}:\d{2}$/),
  packageType: z.string(),
  participants: z.number().min(1)
});

// Get available time slots
router.get('/slots', async (req, res) => {
  try {
    const { date } = req.query;
    
    if (!date || typeof date !== 'string') {
      return res.status(400).json({ message: 'Date is required' });
    }
    
    // Check Redis cache first
    const cachedSlots = await redisClient.get(`slots:${date}`);
    if (cachedSlots) {
      return res.json(JSON.parse(cachedSlots));
    }
    
    // Get from database if not in cache
    const result = await query(
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
    console.error('Error fetching available slots:', error);
    res.status(500).json({ message: 'Error fetching available slots' });
  }
});

// Create new booking
router.post('/', async (req, res) => {
  try {
    const validatedData = bookingSchema.parse(req.body);
    const { clientId, date, timeSlot, packageType, participants } = validatedData;
    
    // Start transaction
    await query('BEGIN');
    
    // Check availability
    const availabilityCheck = await query(
      `SELECT is_available FROM available_slots 
       WHERE date = $1 AND time_slot = $2`,
      [date, timeSlot]
    );
    
    if (!availabilityCheck.rows[0]?.is_available) {
      await query('ROLLBACK');
      return res.status(400).json({ message: 'Slot not available' });
    }
    
    // Get package price
    const packageResult = await query(
      'SELECT base_price FROM corporate_packages WHERE name = $1',
      [packageType]
    );
    
    if (!packageResult.rows[0]) {
      await query('ROLLBACK');
      return res.status(400).json({ message: 'Invalid package type' });
    }
    
    const totalAmount = packageResult.rows[0].base_price * participants;
    
    // Create booking
    const bookingResult = await query(
      `INSERT INTO bookings (client_id, date, time_slot, package_type, participants, total_amount)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING id`,
      [clientId, date, timeSlot, packageType, participants, totalAmount]
    );

    // Get client email for confirmation
    const clientInfo = await query(
      'SELECT email, company_name FROM corporate_clients WHERE id = $1',
      [clientId]
    );
    
    // Update availability
    await query(
      `UPDATE available_slots 
       SET is_available = false 
       WHERE date = $1 AND time_slot = $2`,
      [date, timeSlot]
    );
    
    // Clear cache
    await redisClient.del(`slots:${date}`);
    
    await query('COMMIT');

    // Send booking confirmation email
    if (clientInfo.rows[0]?.email) {
      await sendBookingConfirmation(clientInfo.rows[0].email, {
        date,
        timeSlot,
        packageType,
        participants,
        companyName: clientInfo.rows[0].company_name,
        totalAmount
      });
    }
    
    res.status(201).json({ 
      bookingId: bookingResult.rows[0].id,
      message: 'Booking created successfully'
    });
  } catch (error) {
    await query('ROLLBACK');
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: 'Invalid input', errors: error.errors });
    }
    console.error('Error creating booking:', error);
    res.status(500).json({ message: 'Error creating booking' });
  }
});

// Get client's bookings
router.get('/client/:clientId', async (req, res) => {
  try {
    const { clientId } = req.params;
    
    const result = await query(
      `SELECT * FROM bookings 
       WHERE client_id = $1 
       ORDER BY date DESC, time_slot ASC`,
      [clientId]
    );
    
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching client bookings:', error);
    res.status(500).json({ message: 'Error fetching bookings' });
  }
});

export default router; 