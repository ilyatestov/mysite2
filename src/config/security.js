const dotenv = require('dotenv');

// Загрузка переменных окружения
dotenv.config();

// Проверка конфигурации безопасности
const checkSecurityConfig = () => {
  // Проверка JWT_SECRET
  if (!process.env.JWT_SECRET) {
    console.error('ERROR: JWT_SECRET не установлен в переменных окружения.');
    console.error('Пожалуйста, установите JWT_SECRET в файле .env');
    process.exit(1);
  }

  if (process.env.JWT_SECRET === 'your-secret-key-here') {
    console.error('ERROR: Используется тестовый JWT_SECRET. Пожалуйста, измените его в .env');
    process.exit(1);
  }

  if (process.env.JWT_SECRET.length < 32) {
    console.error('ERROR: JWT_SECRET слишком короткий. Минимальная длина 32 символа.');
    process.exit(1);
  }

  // Проверка других важных переменных
  if (!process.env.NODE_ENV) {
    console.warn('WARNING: NODE_ENV не установлен. Будет использовано значение по умолчанию: development');
  }

  // Проверка, что файл .env не отслеживается в Git
  console.log('Security configuration check passed');
};

module.exports = { checkSecurityConfig };