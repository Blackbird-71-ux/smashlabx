import express, { Request, Response } from 'express';
import { db } from '../config/database.js';

const router = express.Router();

// Process payment
router.post('/process', async (req: Request, res: Response) => {
  try {
    const { bookingId, amount, paymentMethod } = req.body;
    
    // Start transaction
    await db.query('BEGIN');
    
    // Record payment
    const result = await db.query(
      `INSERT INTO payments (booking_id, amount, payment_method, status)
       VALUES ($1, $2, $3, 'completed')
       RETURNING id`,
      [bookingId, amount, paymentMethod]
    );
    
    // Update booking status
    await db.query(
      'UPDATE bookings SET payment_status = $1 WHERE id = $2',
      ['paid', bookingId]
    );
    
    await db.query('COMMIT');
    
    res.status(201).json({
      paymentId: result.rows[0].id,
      message: 'Payment processed successfully'
    });
  } catch (error) {
    await db.query('ROLLBACK');
    console.error('Error processing payment:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get payment history
router.get('/history/:bookingId', async (req: Request, res: Response) => {
  try {
    const { bookingId } = req.params;
    
    const result = await db.query(
      'SELECT * FROM payments WHERE booking_id = $1 ORDER BY created_at DESC',
      [bookingId]
    );
    
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching payment history:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router; 