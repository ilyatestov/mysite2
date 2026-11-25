const { Sequelize } = require('sequelize');
require('dotenv').config();

// Создаем единый экземпляр Sequelize с разной конфигурацией в зависимости от среды
const sequelize = new Sequelize({
  dialect: 'sqlite',
  // Используем in-memory базу для тестов, файловую для development
  storage: process.env.NODE_ENV === 'test' ? ':memory:' : './data/database.sqlite',
  logging: false // Установите true для логирования SQL запросов
});

// Экспортируем только экземпляр, чтобы все модели использовали один и тот же
module.exports = sequelize;