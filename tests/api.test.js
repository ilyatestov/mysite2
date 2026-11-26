const request = require('supertest');
const app = require('../src/server');

// Убираем фиксированный порт - используем supertest напрямую
// supertest позволяет тестировать Express app без самостоятельного app.listen()

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

  // Тесты для основных маршрутов
  // Проверяем, что маршруты существуют, но не требуют авторизации
  test('should get posts list', async () => {
    const response = await request(app).get('/posts');
    expect(response.status).toBe(200);
  });

  test('should get categories list', async () => {
    const response = await request(app).get('/categories');
    expect(response.status).toBe(200);
  });
});