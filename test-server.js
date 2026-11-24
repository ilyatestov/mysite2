const request = require('supertest');
const app = require('./src/server');

describe('Server Tests', () => {
  test('should return welcome message on root route', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Welcome to MySite2 API');
  });

  test('should return health check', async () => {
    const response = await request(app).get('/health');
    expect(response.status).toBe(200);
    expect(response.body.status).toBe('healthy');
  });

  test('should return 404 for non-existent route', async () => {
    const response = await request(app).get('/non-existent');
    expect(response.status).toBe(404);
  });
});