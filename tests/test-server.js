// Используем отдельный сервер для тестов
const app = require('../src/server');
const { testSequelize } = require('./setup');

// Используем тестовую базу данных для всех моделей
const models = require('../src/models');
// Переопределяем sequelize для моделей
models.sequelize = testSequelize;

// Экспортируем только для тестов
module.exports = app;