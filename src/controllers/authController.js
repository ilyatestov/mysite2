const User = require('../models/User');
const jwt = require('jsonwebtoken');
const sequelize = require('../config/db');

// POST /auth/login - вход пользователя
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }
    
    // Найти пользователя по email
    const user = await User.findOne({
      where: { email }
    });
    
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    // Проверить пароль
    const isValidPassword = await user.comparePassword(password);
    
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    // Создать JWT токен
    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
    );
    
    res.json({
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Failed to login' });
  }
};

// POST /auth/register - регистрация нового пользователя
const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    if (!username || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    
    // Проверить, что пользователь с таким email не существует
    const existingUser = await User.findOne({
      where: { email }
    });
    
    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }
    
    // Создать нового пользователя
    const user = await User.create({
      username,
      email,
      password
    });
    
    // Сгенерировать JWT токен
    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
    );
    
    res.status(201).json({
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(400).json({ error: 'Failed to register', details: error.message });
  }
};

// GET /auth/profile - получить профиль пользователя
const getProfile = async (req, res) => {
  try {
    console.log('Getting profile for user ID:', req.user.id);
    const user = await User.findByPk(req.user.id);
    if (!user) {
      console.log('User not found for ID:', req.user.id);
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json({
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      firstName: user.firstName,
      lastName: user.lastName,
      bio: user.bio
    });
  } catch (error) {
    console.error('Profile fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
};

// PUT /auth/profile - обновить профиль пользователя
const updateProfile = async (req, res) => {
  try {
    // Обновить только разрешенные поля
    const allowedFields = ['firstName', 'lastName', 'bio'];
    const updateData = {};
    
    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        updateData[field] = req.body[field];
      }
    }
    
    const user = await User.findByPk(req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    await user.update(updateData);
    res.json(user);
  } catch (error) {
    console.error('Profile update error:', error);
    res.status(400).json({ error: 'Failed to update profile', details: error.message });
  }
};

module.exports = {
  login,
  register,
  getProfile,
  updateProfile
};