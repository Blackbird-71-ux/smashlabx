const express = require('express');
const router = express.Router();
const db = require('../config/database');
const { redisClient } = require('../config/database');

// Get corporate client profile
router.get('/profile/:clientId', async (req, res) => {
  try {
    const { clientId } = req.params;
    
    // Check cache first
    const cachedProfile = await redisClient.get(`profile:${clientId}`);
    if (cachedProfile) {
      return res.json(JSON.parse(cachedProfile));
    }
    
    const result = await db.query(
      `SELECT id, company_name, email, contact_person, created_at 
       FROM corporate_clients 
       WHERE id = $1`,
      [clientId]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Client not found' });
    }
    
    // Cache profile
    await redisClient.set(`profile:${clientId}`, JSON.stringify(result.rows[0]), {
      EX: 3600 // Cache for 1 hour
    });
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching profile' });
  }
});

// Update corporate client profile
router.put('/profile/:clientId', async (req, res) => {
  try {
    const { clientId } = req.params;
    const { companyName, contactPerson } = req.body;
    
    const result = await db.query(
      `UPDATE corporate_clients 
       SET company_name = $1, contact_person = $2 
       WHERE id = $3 
       RETURNING id, company_name, email, contact_person`,
      [companyName, contactPerson, clientId]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Client not found' });
    }
    
    // Update cache
    await redisClient.set(`profile:${clientId}`, JSON.stringify(result.rows[0]), {
      EX: 3600
    });
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating profile' });
  }
});

// Get corporate client statistics
router.get('/stats/:clientId', async (req, res) => {
  try {
    const { clientId } = req.params;
    
    const stats = await db.query(
      `SELECT 
        COUNT(*) as total_bookings,
        SUM(participants) as total_participants,
        MAX(date) as last_booking_date
       FROM bookings 
       WHERE client_id = $1`,
      [clientId]
    );
    
    res.json(stats.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching statistics' });
  }
});

module.exports = router; 