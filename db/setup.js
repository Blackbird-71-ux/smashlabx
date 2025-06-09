const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// First connect to postgres database to create our database
const initialPool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: 'postgres', // Connect to default postgres database first
  password: process.env.DB_PASSWORD || 'postgres',
  port: process.env.DB_PORT || 5432,
});

async function createDatabase() {
  try {
    // Check if database exists
    const result = await initialPool.query(
      "SELECT 1 FROM pg_database WHERE datname = $1",
      [process.env.DB_NAME || 'smashlabs']
    );

    if (result.rows.length === 0) {
      console.log('Creating database...');
      await initialPool.query(`CREATE DATABASE ${process.env.DB_NAME || 'smashlabs'}`);
      console.log('Database created successfully!');
    } else {
      console.log('Database already exists.');
    }
  } catch (error) {
    console.error('Error creating database:', error);
    process.exit(1);
  } finally {
    await initialPool.end();
  }
}

// Then connect to our database to set up tables
const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'smashlabs',
  password: process.env.DB_PASSWORD || 'postgres',
  port: process.env.DB_PORT || 5432,
});

async function setupDatabase() {
  try {
    console.log('Setting up database schema...');
    
    // Read and execute schema.sql
    const schemaPath = path.join(__dirname, 'schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');
    
    // Split the schema into individual statements
    const statements = schema
      .split(';')
      .filter(statement => statement.trim())
      .map(statement => statement + ';');

    // Execute each statement
    for (const statement of statements) {
      try {
        await pool.query(statement);
        console.log('Executed:', statement.split('\n')[0]);
      } catch (error) {
        console.error('Error executing statement:', error.message);
        // Continue with next statement
      }
    }

    // Insert default packages
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

    console.log('Database setup completed successfully!');
  } catch (error) {
    console.error('Error setting up database:', error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

// Run the setup
async function main() {
  await createDatabase();
  await setupDatabase();
}

main().catch(console.error); 