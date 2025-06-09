const request = require('supertest');
const app = require('../server');
const db = require('../config/database');
const faker = require('faker');

describe('Authentication Routes', () => {
  let testUser;

  beforeAll(async () => {
    // Create test database tables
    await db.query(`
      CREATE TABLE IF NOT EXISTS corporate_clients (
        id SERIAL PRIMARY KEY,
        company_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        contact_person VARCHAR(255) NOT NULL
      )
    `);
  });

  beforeEach(() => {
    testUser = {
      companyName: faker.company.companyName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      contactPerson: faker.name.findName()
    };
  });

  afterAll(async () => {
    // Clean up test database
    await db.query('DROP TABLE IF EXISTS corporate_clients');
    await db.end();
  });

  describe('POST /api/auth/register', () => {
    it('should register a new corporate client', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send(testUser);

      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty('token');
    });

    it('should not register with existing email', async () => {
      // First registration
      await request(app)
        .post('/api/auth/register')
        .send(testUser);

      // Try to register again with same email
      const res = await request(app)
        .post('/api/auth/register')
        .send(testUser);

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('message');
    });
  });

  describe('POST /api/auth/login', () => {
    beforeEach(async () => {
      // Register a test user
      await request(app)
        .post('/api/auth/register')
        .send(testUser);
    });

    it('should login with valid credentials', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: testUser.email,
          password: testUser.password
        });

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('token');
    });

    it('should not login with invalid password', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: testUser.email,
          password: 'wrongpassword'
        });

      expect(res.statusCode).toBe(401);
      expect(res.body).toHaveProperty('message');
    });
  });
}); 