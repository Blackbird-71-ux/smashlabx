const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'smashlabs',
  password: process.env.DB_PASSWORD || 'postgres',
  port: process.env.DB_PORT || 5432,
});

async function seedPackages() {
  try {
    console.log('Inserting default packages...');
    
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
      const packageResult = await pool.query(
        `INSERT INTO corporate_packages (name, description, duration, max_participants, base_price)
         VALUES ($1, $2, $3, $4, $5)
         RETURNING id`,
        [packageData.name, packageData.description, packageData.duration, 
         packageData.max_participants, packageData.base_price]
      );

      const packageId = packageResult.rows[0].id;

      // Insert features
      for (const feature of features) {
        await pool.query(
          `INSERT INTO package_features (package_id, feature_name)
           VALUES ($1, $2)`,
          [packageId, feature]
        );
      }
    }

    console.log('Default packages inserted successfully!');
  } catch (error) {
    console.error('Error seeding packages:', error);
  } finally {
    await pool.end();
  }
}

seedPackages(); 