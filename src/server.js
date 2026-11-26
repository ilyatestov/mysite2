const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

// Проверка конфигурации безопасности
const { checkSecurityConfig } = require('./config/security');
checkSecurityConfig();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to MySite2 API',
    version: '1.0.0',
    status: 'running'
  });
});

// Health check route
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString()
  });
});

// Подключение маршрутов
const usersRouter = require('./routes/users');
const postsRouter = require('./routes/posts');
const categoriesRouter = require('./routes/categories');
const tagsRouter = require('./routes/tags');
const commentsRouter = require('./routes/comments');
const messagesRouter = require('./routes/messages');
const referralsRouter = require('./routes/referrals');
const adminLogsRouter = require('./routes/adminLogs');
const adminRouter = require('./routes/admin');
const authRouter = require('./routes/auth');

app.use('/users', usersRouter);
app.use('/posts', postsRouter);
app.use('/categories', categoriesRouter);
app.use('/tags', tagsRouter);
app.use('/comments', commentsRouter);
app.use('/messages', messagesRouter);
app.use('/referrals', referralsRouter);
app.use('/admin-logs', adminLogsRouter);
app.use('/admin', adminRouter);
app.use('/auth', authRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Route not found'
  });
});

// Экспортируем app для тестирования
module.exports = app;

// Запуск сервера только если файл запущен напрямую (не импортирован)
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Health check: http://localhost:${PORT}/health`);
  });
}