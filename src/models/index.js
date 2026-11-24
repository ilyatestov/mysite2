const fs = require('fs');
const path = require('path');
const { Sequelize } = require('sequelize');
const sequelize = require('../config/db');

// Импорт всех моделей
const models = {};

// Читаем все файлы моделей из директории
const modelFiles = fs.readdirSync(__dirname)
  .filter(file => file !== 'index.js' && file.endsWith('.js'));

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

models.sequelize = sequelize;
models.Sequelize = Sequelize;

module.exports = models;