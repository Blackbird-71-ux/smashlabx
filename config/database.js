const { Pool } = require('pg');
const Redis = require('redis');

// PostgreSQL configuration
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Redis configuration
const redisClient = Redis.createClient({
  url: process.env.REDIS_URL
});

redisClient.on('error', (err) => console.log('Redis Client Error', err));
redisClient.connect();

module.exports = {
  query: (text, params) => pool.query(text, params),
  redisClient
}; 