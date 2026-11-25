// Специальный файл для подключения к тестовой базе данных
const { Sequelize } = require('sequelize');

// Для тестов используем in-memory базу данных
const testSequelize = new Sequelize({
  dialect: 'sqlite',
  storage: ':memory:',
  logging: false
});

module.exports = testSequelize;