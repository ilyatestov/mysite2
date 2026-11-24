const express = require('express');
const router = express.Router();
const { login, register, getProfile, updateProfile } = require('../controllers/authController');
const { authenticate } = require('../middleware/auth');

// POST /auth/login - вход пользователя
router.post('/login', login);

// POST /auth/register - регистрация нового пользователя
router.post('/register', register);

// GET /auth/profile - получить профиль пользователя
router.get('/profile', authenticate, getProfile);

// PUT /auth/profile - обновить профиль пользователя
router.put('/profile', authenticate, updateProfile);

module.exports = router;