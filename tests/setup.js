// Настройка тестовой среды
// Импортируем только нужные модули здесь, чтобы избежать проблем с импортом до установки NODE_ENV
const getSequelizeInstance = require('../src/config/db');
const { testSequelize } = require('./test-db');

// Экспортируем функцию для инициализации тестов
async function setupTestDatabase() {
  try {
    // Используем уже существующий экземпляр с правильной конфигурацией для тестов
    const sequelize = getSequelizeInstance();
    
    // Проверяем, что это действительно тестовая конфигурация
    if (sequelize.options.storage !== ':memory:') {
      throw new Error('Test database is not configured correctly');
    }
    
    await sequelize.authenticate();
    console.log('Test database connection has been established successfully.');
    
    // Синхронизируем модели с тестовой базой данных
    await sequelize.sync({ force: true });
    console.log('Test database synchronized successfully.');
    
    return sequelize;
  } catch (error) {
    console.error('Unable to connect to the test database:', error);
    throw error;
  }
}

// Экспортируем cleanup функцию
async function cleanupTestDatabase() {
  const sequelize = getSequelizeInstance();
  await sequelize.close();
  console.log('Test database connection closed.');
}

module.exports = {
  setupTestDatabase,
  cleanupTestDatabase
};