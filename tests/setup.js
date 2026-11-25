// Настройка тестовой среды
// Импортируем только нужные модули здесь, чтобы избежать проблем с импортом до установки NODE_ENV
const { testSequelize } = require('./test-db');

// Экспортируем функцию для инициализации тестов
async function setupTestDatabase() {
  try {
    await testSequelize.authenticate();
    console.log('Test database connection has been established successfully.');
    
    // Синхронизируем модели с тестовой базой данных
    await testSequelize.sync({ force: true });
    console.log('Test database synchronized successfully.');
    
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