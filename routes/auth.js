const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/database');

// Register new corporate client
router.post('/register', async (req, res) => {
  try {
    const { companyName, email, password, contactPerson } = req.body;
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Insert into database
    const result = await db.query(
      'INSERT INTO corporate_clients (company_name, email, password, contact_person) VALUES ($1, $2, $3, $4) RETURNING id',
      [companyName, email, hashedPassword, contactPerson]
    );
    
    // Generate JWT
    const token = jwt.sign(
      { id: result.rows[0].id },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    res.status(201).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error registering client' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Get user from database
    const result = await db.query(
      'SELECT * FROM corporate_clients WHERE email = $1',
      [email]
    );
    
    if (result.rows.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    const user = result.rows[0];
    
    // Verify password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    // Generate JWT
    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error logging in' });
  }
});

module.exports = router; 