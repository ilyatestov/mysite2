const { Sequelize } = require('sequelize');
require('dotenv').config();

// Для тестов создаем отдельный экземпляр, чтобы избежать кэширования
let testSequelizeInstance = null;
let devSequelizeInstance = null;

function getSequelizeInstance() {
  // В зависимости от среды возвращаем соответствующий экземпляр
  if (process.env.NODE_ENV === 'test') {
    if (!testSequelizeInstance) {
      testSequelizeInstance = new Sequelize({
        dialect: 'sqlite',
        storage: ':memory:',
        logging: false
      });
    }
    return testSequelizeInstance;
  } else {
    if (!devSequelizeInstance) {
      devSequelizeInstance = new Sequelize({
        dialect: 'sqlite',
        storage: './data/database.sqlite',
        logging: false
      });
    }
    return devSequelizeInstance;
  }
}

// Экспортируем функцию для получения экземпляра
module.exports = getSequelizeInstance;