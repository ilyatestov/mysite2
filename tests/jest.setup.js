// Jest setup file
const { testSequelize } = require('./setup');
const models = require('../src/models');

// Инициализация тестовой базы данных
beforeAll(async () => {
  try {
    await testSequelize.authenticate();
    console.log('Test database connection has been established successfully.');
    
    // Синхронизируем модели с тестовой базой данных
    await testSequelize.sync({ force: true });
    console.log('Test database synchronized successfully.');
  } catch (error) {
    console.error('Unable to connect to the test database:', error);
    throw error;
  }
});

// Закрытие соединения после всех тестов
afterAll(async () => {
  await testSequelize.close();
  console.log('Test database connection closed.');
});