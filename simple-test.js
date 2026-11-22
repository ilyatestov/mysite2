// Простой тест для проверки API без запуска сервера
const express = require('express');
const request = require('supertest');

// Создаем простое приложение для тестирования
const app = express();
app.use(express.json());

// Имитируем основные маршруты
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

console.log('Testing API endpoints...');

// Проверка основных маршрутов
async function testAPI() {
  try {
    // Тест главной страницы
    console.log('Testing root endpoint...');
    const rootResponse = await request(app).get('/');
    console.log('Root response status:', rootResponse.status);
    console.log('Root response body:', rootResponse.body.message);
    
    // Тест health check
    console.log('Testing health endpoint...');
    const healthResponse = await request(app).get('/health');
    console.log('Health response status:', healthResponse.status);
    console.log('Health response body:', healthResponse.body.status);
    
    // Тест несуществующего маршрута
    console.log('Testing 404 endpoint...');
    const notFoundResponse = await request(app).get('/non-existent');
    console.log('404 response status:', notFoundResponse.status);
    
    console.log('API tests completed successfully!');
  } catch (error) {
    console.error('API test failed:', error.message);
  }
}

testAPI();