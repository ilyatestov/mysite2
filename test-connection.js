// Проверка соединения с БД для разных сред
const { Sequelize } = require('sequelize');

// Имитируем работу с NODE_ENV
console.log('=== Тестовая среда ===');
process.env.NODE_ENV = 'test';
const testDb = require('./src/config/db')();
console.log('Test storage:', testDb.options.storage);

console.log('=== Разработка ===');
process.env.NODE_ENV = 'development';
const devDb = require('./src/config/db')();
console.log('Dev storage:', devDb.options.storage);

console.log('=== Проверка моделей ===');
const models = require('./src/models');
console.log('Models use same instance:', models.sequelize === testDb);
console.log('User model sequelize:', models.User.sequelize === testDb);