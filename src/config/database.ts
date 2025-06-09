import { Pool, PoolConfig, PoolClient, QueryResult, QueryResultRow, QueryConfig } from 'pg';
import { createClient, RedisClientType } from 'redis';
import dotenv from 'dotenv';
import logger from './logger.js';

dotenv.config();

// Database configuration
const dbConfig: PoolConfig = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || '5432'),
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
  max: 20, // Maximum number of clients in the pool
  idleTimeoutMillis: 30000, // How long a client is allowed to remain idle before being closed
  connectionTimeoutMillis: 2000, // How long to wait for a connection
  maxUses: 7500, // Close & replace a connection after it has been used this many times
};

// Create the pool
const pool = new Pool(dbConfig);

// Handle pool errors
pool.on('error', (err) => {
  logger.error('Unexpected error on idle client', err);
  process.exit(-1);
});

// Test the connection
pool.connect((err, client, release) => {
  if (err) {
    logger.error('Error connecting to the database:', err);
    return;
  }
  if (client) {
    client.query('SELECT NOW()', (err) => {
      release();
      if (err) {
        logger.error('Error executing test query:', err);
        return;
      }
      logger.info('Database connection successful');
    });
  }
});

// Helper function to execute queries
export const query = async (text: string, params?: unknown[]): Promise<QueryResult<QueryResultRow>> => {
  const start = Date.now();
  try {
    const res = await pool.query(text, params);
    const duration = Date.now() - start;
    logger.debug('Executed query', { text, duration, rows: res.rowCount });
    return res;
  } catch (error) {
    logger.error('Error executing query:', { text, error });
    throw error;
  }
};

// Helper function to get a client from the pool
export const getClient = async (): Promise<PoolClient> => {
  const client = await pool.connect();
  const originalQuery = client.query;
  const release = client.release;

  // Set a timeout of 5 seconds, after which we will log this client's last query
  const timeout = setTimeout(() => {
    logger.error('A client has been checked out for more than 5 seconds!');
    logger.error(`The last executed query on this client was: ${(client as { lastQuery?: { text: string | QueryConfig, values?: unknown[] } }).lastQuery}`);
  }, 5000);

  // Monkey patch the query method to keep track of the last query executed
  (client as any).query = function (
    ...args: Parameters<PoolClient['query']>
  ): ReturnType<PoolClient['query']> {
    (client as any).lastQuery = args[0];
    return originalQuery.apply(this, args);
  };

  client.release = () => {
    clearTimeout(timeout);
    (client as any).query = originalQuery;
    client.release = release;
    release.apply(client);
  };

  return client;
};

// Redis configuration
const redisClient: RedisClientType = createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379'
});

redisClient.on('error', (err: Error) => console.error('Redis Client Error:', err));

export { redisClient };

// Remove unused interface Database if not used elsewhere
// ... existing code ... 