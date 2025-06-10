import express, { Request, Response } from 'express';
import { query } from '../config/database.js';

const router = express.Router();

// Get corporate clients
router.get('/clients', async (req: Request, res: Response) => {
  try {
    const result = await query(
      'SELECT * FROM corporate_clients ORDER BY company_name ASC'
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching corporate clients:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get corporate packages
router.get('/packages', async (req: Request, res: Response) => {
  try {
    const result = await query(
      'SELECT * FROM corporate_packages WHERE is_active = true ORDER BY base_price ASC'
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching corporate packages:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router; 