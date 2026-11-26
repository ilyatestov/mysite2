// Jest setup file
const { setupTestDatabase, cleanupTestDatabase } = require('./setup');

// Устанавливаем NODE_ENV для тестов
process.env.NODE_ENV = 'test';

let testDatabase;

// Инициализация тестовой базы данных
beforeAll(async () => {
  try {
    testDatabase = await setupTestDatabase();
    console.log('Test database setup completed');
  } catch (error) {
    console.error('Failed to setup test database:', error);
    throw error;
  }
});

// Закрытие соединения после всех тестов
afterAll(async () => {
  try {
    await cleanupTestDatabase();
    console.log('Test database cleanup completed');
  } catch (error) {
    console.error('Failed to cleanup test database:', error);
  }
});

// Экспортируем для использования в тестах
module.exports = {
  testDatabase
};