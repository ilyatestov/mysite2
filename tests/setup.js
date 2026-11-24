// Настройка тестовой среды
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');

// Создаем временную базу данных для тестов
const testDbPath = path.join(__dirname, 'test-database.sqlite');

// Удаляем старую тестовую БД если она существует
if (fs.existsSync(testDbPath)) {
  fs.unlinkSync(testDbPath);
}

// Создаем тестовую конфигурацию базы данных
const testSequelize = new Sequelize({
  dialect: 'sqlite',
  storage: testDbPath,
  logging: false
});

module.exports = {
  testSequelize,
  testDbPath
};