const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres', // Connect to default database first
  password: 'postgres',
  port: 5432,
});

async function setupDatabase() {
  try {
    // Create database if it doesn't exist
    await pool.query('CREATE DATABASE smashlabs');
    console.log('Database created successfully');

    // Connect to the new database
    pool.end();
    const smashlabsPool = new Pool({
      user: 'postgres',
      host: 'localhost',
      database: 'smashlabs',
      password: 'postgres',
      port: 5432,
    });

    // Read and execute schema.sql
    const schemaPath = path.join(__dirname, 'db', 'schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');
    
    // Split the schema into individual statements
    const statements = schema
      .split(';')
      .filter(statement => statement.trim())
      .map(statement => statement + ';');

    // Execute each statement
    for (const statement of statements) {
      await smashlabsPool.query(statement);
      console.log('Executed:', statement.split('\n')[0]);
    }

    // Insert default packages
    const packages = [
      {
        name: 'Team Express',
        description: 'Perfect for small teams',
        duration: 120,
        max_participants: 10,
        base_price: 499.99,
        features: [
          '2-hour stress relief session',
          'Basic safety equipment',
          'Refreshments included',
          'Basic wellness consultation'
        ]
      },
      {
        name: 'Corporate Wellness',
        description: 'Comprehensive team experience',
        duration: 180,
        max_participants: 20,
        base_price: 899.99,
        features: [
          '3-hour stress relief session',
          'Premium safety equipment',
          'Gourmet refreshments',
          'Detailed wellness consultation',
          'Team building activities'
        ]
      },
      {
        name: 'Enterprise Solution',
        description: 'Full-scale corporate program',
        duration: 240,
        max_participants: 30,
        base_price: 1499.99,
        features: [
          '4-hour stress relief session',
          'Premium safety equipment',
          'Gourmet refreshments',
          'Detailed wellness consultation',
          'Team building activities',
          'Custom branding options',
          'Dedicated wellness coach'
        ]
      }
    ];

    for (const pkg of packages) {
      const { features, ...packageData } = pkg;
      
      // Insert package
      const packageResult = await smashlabsPool.query(
        `INSERT INTO corporate_packages (name, description, duration, max_participants, base_price)
         VALUES ($1, $2, $3, $4, $5)
         RETURNING id`,
        [packageData.name, packageData.description, packageData.duration, 
         packageData.max_participants, packageData.base_price]
      );

      const packageId = packageResult.rows[0].id;

      // Insert features
      for (const feature of features) {
        await smashlabsPool.query(
          `INSERT INTO package_features (package_id, feature_name)
           VALUES ($1, $2)`,
          [packageId, feature]
        );
      }
    }

    // Create some available slots for the next 7 days
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      const dateStr = date.toISOString().split('T')[0];

      // Create slots from 9 AM to 5 PM
      for (let hour = 9; hour < 17; hour++) {
        const timeSlot = `${hour.toString().padStart(2, '0')}:00`;
        await smashlabsPool.query(
          `INSERT INTO available_slots (date, time_slot, is_available)
           VALUES ($1, $2, true)`,
          [dateStr, timeSlot]
        );
      }
    }

    console.log('Database setup completed successfully!');
    await smashlabsPool.end();
  } catch (error) {
    console.error('Error setting up database:', error);
    process.exit(1);
  }
}

setupDatabase(); 