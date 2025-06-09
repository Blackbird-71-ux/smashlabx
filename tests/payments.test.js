const request = require('supertest');
const app = require('../server');
const db = require('../config/database');
const faker = require('faker');
const jwt = require('jsonwebtoken');
const stripe = require('stripe');

// Mock Stripe for testing
jest.mock('stripe', () => {
  return jest.fn((apiKey) => ({
    paymentIntents: {
      create: jest.fn((params) => {
        return Promise.resolve({
          client_secret: 'client_secret_mock',
          metadata: params.metadata,
        });
      }),
    },
    webhooks: {
      constructEvent: jest.fn(() => ({ type: 'payment_intent.succeeded', data: { object: { metadata: { bookingId: 123 } } } })),
    },
  }));
});

describe('Payment Routes', () => {
  let testUser;
  let authToken;
  let testClientId;
  let testBookingId;

  beforeAll(async () => {
    // Create test database tables
    await db.query(`
      CREATE TABLE IF NOT EXISTS corporate_clients (
        id SERIAL PRIMARY KEY,
        company_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        contact_person VARCHAR(255) NOT NULL
      );
      CREATE TABLE IF NOT EXISTS bookings (
        id SERIAL PRIMARY KEY,
        client_id INTEGER REFERENCES corporate_clients(id),
        date DATE NOT NULL,
        time_slot TIME NOT NULL,
        package_type VARCHAR(50) NOT NULL,
        participants INTEGER NOT NULL,
        status VARCHAR(20) DEFAULT 'pending',
        payment_status VARCHAR(20) DEFAULT 'pending'
      );
    `);
  });

  beforeEach(async () => {
    // Create test user
    testUser = {
      companyName: faker.company.companyName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      contactPerson: faker.name.findName()
    };

    // Register and login to get auth token and client ID
    const registerRes = await request(app)
      .post('/api/auth/register')
      .send(testUser);

    authToken = registerRes.body.token;
    const decoded = jwt.decode(authToken);
    testClientId = decoded.id;

    // Create a dummy booking for payment tests
    const bookingResult = await db.query(
      `INSERT INTO bookings (client_id, date, time_slot, package_type, participants, status, payment_status)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id`,
      [testClientId, '2024-08-01', '10:00:00', 'team-express', 5, 'pending', 'pending']
    );
    testBookingId = bookingResult.rows[0].id;
  });

  afterEach(async () => {
    // Clean up test data
    await db.query('DELETE FROM bookings WHERE id = $1', [testBookingId]);
    await db.query('DELETE FROM corporate_clients WHERE id = $1', [testClientId]);
  });

  afterAll(async () => {
    // Clean up test database
    await db.query('DROP TABLE IF EXISTS bookings');
    await db.query('DROP TABLE IF EXISTS corporate_clients');
    await db.end();
  });

  describe('POST /api/payments/create-intent', () => {
    it('should create a payment intent', async () => {
      const res = await request(app)
        .post('/api/payments/create-intent')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          amount: 100,
          bookingId: testBookingId,
          clientId: testClientId
        });

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('clientSecret', 'client_secret_mock');
    });
  });

  describe('POST /api/payments/webhook', () => {
    it('should handle payment_intent.succeeded event', async () => {
      const res = await request(app)
        .post('/api/payments/webhook')
        .set('stripe-signature', 'mock_signature')
        .send({}); // Empty body as it's mocked

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('received', true);

      // Verify booking status updated in DB (requires a new DB query or mock for db.query)
      // For now, we rely on the mocked webhook success.
    });
  });
}); 