// Файл для управления тестовой базой данных
const { Sequelize } = require('sequelize');

// Создаем тестовую конфигурацию базы данных с использованием in-memory для лучшей изоляции
const testSequelize = new Sequelize({
  dialect: 'sqlite',
  storage: ':memory:',
  logging: false
});

module.exports = {
  testSequelize
};