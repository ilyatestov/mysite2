const { Sequelize } = require('sequelize');
require('dotenv').config();

// Для development используем SQLite
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './data/database.sqlite',
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