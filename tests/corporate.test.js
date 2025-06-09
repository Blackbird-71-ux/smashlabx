const request = require('supertest');
const app = require('../server');
const db = require('../config/database');
const faker = require('faker');
const jwt = require('jsonwebtoken');

describe('Corporate Routes', () => {
  let testUser;
  let authToken;
  let testClientId;

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

    // Register and login to get auth token and client ID
    const registerRes = await request(app)
      .post('/api/auth/register')
      .send(testUser);

    authToken = registerRes.body.token;
    const decoded = jwt.decode(authToken);
    testClientId = decoded.id;

    // Clear existing bookings for this client for clean tests
    await db.query('DELETE FROM bookings WHERE client_id = $1', [testClientId]);
  });

  afterEach(async () => {
    // Clean up test data
    await db.query('DELETE FROM corporate_clients WHERE id = $1', [testClientId]);
  });

  afterAll(async () => {
    // Clean up test database
    await db.query('DROP TABLE IF EXISTS bookings');
    await db.query('DROP TABLE IF EXISTS corporate_clients');
    await db.end();
  });

  describe('GET /api/corporate/profile/:clientId', () => {
    it('should get corporate client profile', async () => {
      const res = await request(app)
        .get(`/api/corporate/profile/${testClientId}`)
        .set('Authorization', `Bearer ${authToken}`);

      expect(res.statusCode).toBe(200);
      expect(res.body.company_name).toBe(testUser.companyName);
      expect(res.body.email).toBe(testUser.email);
    });

    it('should return 404 for non-existent client', async () => {
      const nonExistentClientId = 99999;
      const res = await request(app)
        .get(`/api/corporate/profile/${nonExistentClientId}`)
        .set('Authorization', `Bearer ${authToken}`);

      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty('message', 'Client not found');
    });
  });

  describe('PUT /api/corporate/profile/:clientId', () => {
    it('should update corporate client profile', async () => {
      const updatedData = {
        companyName: faker.company.companyName() + ' Updated',
        contactPerson: faker.name.findName() + ' Updated'
      };

      const res = await request(app)
        .put(`/api/corporate/profile/${testClientId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .send(updatedData);

      expect(res.statusCode).toBe(200);
      expect(res.body.company_name).toBe(updatedData.companyName);
      expect(res.body.contact_person).toBe(updatedData.contactPerson);
    });

    it('should return 404 for non-existent client when updating', async () => {
      const nonExistentClientId = 99999;
      const updatedData = {
        companyName: faker.company.companyName() + ' Updated',
        contactPerson: faker.name.findName() + ' Updated'
      };

      const res = await request(app)
        .put(`/api/corporate/profile/${nonExistentClientId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .send(updatedData);

      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty('message', 'Client not found');
    });
  });

  describe('GET /api/corporate/stats/:clientId', () => {
    it('should get corporate client statistics', async () => {
      // Add some dummy bookings for stats
      await db.query(
        'INSERT INTO bookings (client_id, date, time_slot, package_type, participants) VALUES ($1, $2, $3, $4, $5)',
        [testClientId, '2024-07-01', '09:00:00', 'team-express', 5]
      );
      await db.query(
        'INSERT INTO bookings (client_id, date, time_slot, package_type, participants) VALUES ($1, $2, $3, $4, $5)',
        [testClientId, '2024-07-15', '11:00:00', 'corporate-catalyst', 10]
      );

      const res = await request(app)
        .get(`/api/corporate/stats/${testClientId}`)
        .set('Authorization', `Bearer ${authToken}`);

      expect(res.statusCode).toBe(200);
      expect(res.body.total_bookings).toBe('2');
      expect(res.body.total_participants).toBe('15');
    });

    it('should return default stats for client with no bookings', async () => {
      const res = await request(app)
        .get(`/api/corporate/stats/${testClientId}`)
        .set('Authorization', `Bearer ${authToken}`);

      expect(res.statusCode).toBe(200);
      expect(res.body.total_bookings).toBe('0');
      expect(res.body.total_participants).toBe(null);
    });
  });
}); 