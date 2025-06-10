import express, { Request, Response } from 'express';
import { z } from 'zod';
import { sendContactEmail } from '../utils/email.js';
import { query } from '../config/database.js';
import logger from '../config/logger.js';

const router = express.Router();

// Validation schema for contact form
const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  company: z.string().min(2, 'Company name must be at least 2 characters'),
  phone: z.string().regex(/^\+?[\d\s-]{10,}$/, 'Invalid phone number'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  package: z.string().optional(),
  participants: z.number().min(1).optional()
});

// Store contact submissions in database
router.post('/', async (req: Request, res: Response) => {
  try {
    // Validate input
    const validatedData = contactSchema.parse(req.body);
    
    // Store in database
    const result = await query(
      `INSERT INTO contact_submissions 
       (name, email, company, phone, message, package_type, participants, status)
       VALUES ($1, $2, $3, $4, $5, $6, $7, 'new')
       RETURNING id`,
      [
        validatedData.name,
        validatedData.email,
        validatedData.company,
        validatedData.phone,
        validatedData.message,
        validatedData.package,
        validatedData.participants
      ]
    );

    // Send email notification
    await sendContactEmail(validatedData);

    // Send confirmation to user
    res.status(201).json({
      success: true,
      message: 'Thank you for your message. We will get back to you soon.',
      submissionId: result.rows[0].id
    });

  } catch (error) {
    logger.error('Contact form submission error:', error);
    
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        message: 'Invalid input',
        errors: error.errors
      });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to submit contact form. Please try again later.'
    });
  }
});

// Get contact submissions (admin only)
router.get('/', async (req: Request, res: Response) => {
  try {
    // TODO: Add admin authentication middleware
    const result = await query(
      `SELECT * FROM contact_submissions 
       ORDER BY created_at DESC 
       LIMIT 100`
    );
    
    res.json(result.rows);
  } catch (error) {
    logger.error('Error fetching contact submissions:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch contact submissions'
    });
  }
});

// Update submission status (admin only)
router.patch('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // TODO: Add admin authentication middleware
    const result = await query(
      `UPDATE contact_submissions 
       SET status = $1, updated_at = NOW()
       WHERE id = $2
       RETURNING *`,
      [status, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Submission not found'
      });
    }

    res.json({
      success: true,
      message: 'Status updated successfully',
      submission: result.rows[0]
    });
  } catch (error) {
    logger.error('Error updating submission status:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update submission status'
    });
  }
});

export default router; 