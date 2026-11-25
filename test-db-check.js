// Проверка конфигурации БД
console.log('=== Проверка конфигурации БД ===');

// Сначала установим NODE_ENV=test
process.env.NODE_ENV = 'test';
const testDb = require('./src/config/db')();
console.log('Test env storage:', testDb.options.storage);

// Сбросим NODE_ENV
process.env.NODE_ENV = 'development';
const devDb = require('./src/config/db')();
console.log('Dev env storage:', devDb.options.storage);

console.log('=== Проверка моделей ===');
const models = require('./src/models');
console.log('Models use same instance:', models.sequelize === testDb);
console.log('User model sequelize:', models.User.sequelize === testDb);