const request = require('supertest');
const express = require('express');

// Создаем простое приложение для тестирования
const app = express();
app.use(express.json());

// Имитируем маршруты
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to MySite2 API',
    version: '1.0.0',
    status: 'running'
  });
});

app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString()
  });
});

app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Route not found'
  });
});

describe('API Tests', () => {
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