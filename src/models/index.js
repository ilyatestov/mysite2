const fs = require('fs');
const path = require('path');
const { Sequelize } = require('sequelize');

// Импорт конфигурации базы данных для получения правильного экземпляра
const getSequelizeInstance = require('../config/db');
const sequelize = getSequelizeInstance();

// Импорт всех моделей
const models = {};

// Читаем все файлы моделей из директории
const modelFiles = fs.readdirSync(__dirname)
  .filter(file => file !== 'index.js' && file.endsWith('.js'));

// Импортируем модели
modelFiles.forEach(file => {
  const modelName = path.basename(file, '.js');
  const model = require(path.join(__dirname, file));
  models[modelName] = model;
});

// Устанавливаем связи между моделями
Object.keys(models).forEach(modelName => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

// Экспортируем sequelize экземпляр для всех моделей
// Используем один экземпляр для всех моделей
models.sequelize = sequelize;
models.Sequelize = Sequelize;

module.exports = models;