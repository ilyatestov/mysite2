const { Sequelize } = require('sequelize');
require('dotenv').config();

// Создаем экземпляр Sequelize с разной конфигурацией в зависимости от среды
const sequelize = new Sequelize({
  dialect: 'sqlite',
  // Используем in-memory базу для тестов, файловую для development
  storage: process.env.NODE_ENV === 'test' ? ':memory:' : './data/database.sqlite',
  logging: false // Установите true для логирования SQL запросов
});

// Для production можно использовать PostgreSQL
// const sequelize = new Sequelize(
//   process.env.DB_NAME || 'mysite2',
//   process.env.DB_USER || 'postgres',
//   process.env.DB_PASSWORD || 'password',
//   {
//     host: process.env.DB_HOST || 'localhost',
//     dialect: 'postgres',
//     logging: false
//   }
// );

module.exports = sequelize;