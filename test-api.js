// Простой тест для проверки API
const request = require('supertest');
const app = require('./src/server');

console.log('Testing API endpoints...');

// Проверка основных маршрутов
async function testAPI() {
  try {
    // Тест главной страницы
    console.log('Testing root endpoint...');
    const rootResponse = await request(app).get('/');
    console.log('Root response:', rootResponse.status, rootResponse.body);
    
    // Тест health check
    console.log('Testing health endpoint...');
    const healthResponse = await request(app).get('/health');
    console.log('Health response:', healthResponse.status, healthResponse.body);
    
    console.log('API tests completed successfully!');
  } catch (error) {
    console.error('API test failed:', error.message);
  }
}

testAPI();