const request = require('supertest');
const app = require('../server');
const db = require('../config/database');
const faker = require('faker');

describe('Booking Routes', () => {
  let testUser;
  let authToken;
  let testBooking;

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

      CREATE TABLE IF NOT EXISTS available_slots (
        id SERIAL PRIMARY KEY,
        date DATE NOT NULL,
        time_slot TIME NOT NULL,
        is_available BOOLEAN DEFAULT true,
        UNIQUE(date, time_slot)
      );

      CREATE TABLE IF NOT EXISTS bookings (
        id SERIAL PRIMARY KEY,
        client_id INTEGER REFERENCES corporate_clients(id),
        date DATE NOT NULL,
        time_slot TIME NOT NULL,
        package_type VARCHAR(50) NOT NULL,
        participants INTEGER NOT NULL,
        status VARCHAR(20) DEFAULT 'pending'
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

    // Register and login
    await request(app)
      .post('/api/auth/register')
      .send(testUser);

    const loginRes = await request(app)
      .post('/api/auth/login')
      .send({
        email: testUser.email,
        password: testUser.password
      });

    authToken = loginRes.body.token;

    // Create test booking data
    testBooking = {
      date: new Date().toISOString().split('T')[0],
      timeSlot: '10:00:00',
      packageType: 'team-express',
      participants: 5
    };

    // Create available slot
    await db.query(
      'INSERT INTO available_slots (date, time_slot) VALUES ($1, $2)',
      [testBooking.date, testBooking.timeSlot]
    );
  });

  afterAll(async () => {
    // Clean up test database
    await db.query('DROP TABLE IF EXISTS bookings');
    await db.query('DROP TABLE IF EXISTS available_slots');
    await db.query('DROP TABLE IF EXISTS corporate_clients');
    await db.end();
  });

  describe('GET /api/bookings/slots', () => {
    it('should get available slots for a date', async () => {
      const res = await request(app)
        .get(`/api/bookings/slots?date=${testBooking.date}`);

      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBeGreaterThan(0);
    });
  });

  describe('POST /api/bookings', () => {
    it('should create a new booking', async () => {
      const res = await request(app)
        .post('/api/bookings')
        .set('Authorization', `Bearer ${authToken}`)
        .send(testBooking);

      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty('bookingId');
    });

    it('should not create booking for unavailable slot', async () => {
      // First booking
      await request(app)
        .post('/api/bookings')
        .set('Authorization', `Bearer ${authToken}`)
        .send(testBooking);

      // Try to book same slot again
      const res = await request(app)
        .post('/api/bookings')
        .set('Authorization', `Bearer ${authToken}`)
        .send(testBooking);

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('message');
    });
  });

  describe('GET /api/bookings/client/:clientId', () => {
    it('should get client bookings', async () => {
      // Create a booking first
      await request(app)
        .post('/api/bookings')
        .set('Authorization', `Bearer ${authToken}`)
        .send(testBooking);

      const res = await request(app)
        .get('/api/bookings/client/1')
        .set('Authorization', `Bearer ${authToken}`);

      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBeGreaterThan(0);
    });
  });
}); 