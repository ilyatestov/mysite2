// Файл для управления тестовой базой данных
const { Sequelize } = require('sequelize');

// Создаем тестовую конфигурацию базы данных с использованием in-memory для лучшей изоляции
const testSequelize = new Sequelize({
  dialect: 'sqlite',
  storage: ':memory:',
  logging: false
});

// Экспортируем функцию для выполнения миграций
async function runMigrations() {
  try {
    // Проверяем подключение
    await testSequelize.authenticate();
    console.log('Test database connected successfully for migrations');
    
    // Импортируем миграции
    const fs = require('fs');
    
    // Получаем список миграций
    const migrationFiles = fs.readdirSync('./src/migrations')
      .filter(file => file.endsWith('.js'))
      .sort();
    
    console.log('Found migrations:', migrationFiles.length);
    
    // Выполняем миграции по порядку
    for (const file of migrationFiles) {
      const migration = require(`../src/migrations/${file}`);
      console.log(`Running migration: ${file}`);
      await migration.up(testSequelize.getQueryInterface(), Sequelize);
    }
    
    console.log('All migrations completed successfully');
  } catch (error) {
    console.error('Error running migrations:', error);
    throw error;
  }
}

module.exports = {
  testSequelize,
  runMigrations
};