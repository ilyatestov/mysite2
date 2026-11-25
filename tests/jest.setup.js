// Jest setup file
const { setupTestDatabase, cleanupTestDatabase } = require('./setup');

// Инициализация тестовой базы данных
beforeAll(async () => {
  await setupTestDatabase();
});

// Закрытие соединения после всех тестов
afterAll(async () => {
  await cleanupTestDatabase();
});