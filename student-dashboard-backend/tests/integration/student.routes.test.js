const request = require('supertest');
const app = require('../../server');
const mongoose = require('mongoose');

describe('POST /students', () => {
  beforeAll(async () => {
    await mongoose.connect('mongodb://localhost:27017/student-dashboard-test');
  });

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });

  it('should create a student', async () => {
    const res = await request(app).post('/students').send({
      name: 'Test Student',
      email: 'test@student.com'
    });

    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe('Test Student');
    expect(res.body.email).toBe('test@student.com');
  });
});
