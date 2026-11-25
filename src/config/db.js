const { Sequelize } = require('sequelize');
require('dotenv').config();

// Создаем единый экземпляр Sequelize с разной конфигурацией в зависимости от среды
let sequelizeInstance = null;

function getSequelizeInstance() {
  if (sequelizeInstance) {
    return sequelizeInstance;
  }
  
  sequelizeInstance = new Sequelize({
    dialect: 'sqlite',
    // Используем in-memory базу для тестов, файловую для development
    storage: process.env.NODE_ENV === 'test' ? ':memory:' : './data/database.sqlite',
    logging: false // Установите true для логирования SQL запросов
  });
  
  return sequelizeInstance;
}

// Экспортируем функцию для получения экземпляра, чтобы избежать кэширования
module.exports = getSequelizeInstance;