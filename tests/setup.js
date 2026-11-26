// Настройка тестовой среды
const { testSequelize, runMigrations } = require('./test-db');

// Экспортируем функцию для инициализации тестов
async function setupTestDatabase() {
  try {
    // Проверяем подключение к тестовой БД
    await testSequelize.authenticate();
    console.log('Test database connection has been established successfully.');
    
    // Выполняем миграции
    await runMigrations();
    console.log('Test database migrations completed successfully.');
    
    return testSequelize;
  } catch (error) {
    console.error('Unable to connect to the test database:', error);
    throw error;
  }
}

// Экспортируем cleanup функцию
async function cleanupTestDatabase() {
  await testSequelize.close();
  console.log('Test database connection closed.');
}

module.exports = {
  setupTestDatabase,
  cleanupTestDatabase
};