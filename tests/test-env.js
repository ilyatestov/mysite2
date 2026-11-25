// Специальный файл для настройки окружения тестов
// Этот файл должен быть импортирован до любого другого кода в тестах
process.env.NODE_ENV = 'test';

// Запускаем инициализацию базы данных для тестов
const sequelize = require('../src/config/db');
const models = require('../src/models');

// Проверяем, что все модели используют правильный экземпляр
console.log('Test environment initialized');
console.log('Sequelize instance storage:', sequelize.options.storage);

module.exports = { sequelize, models };