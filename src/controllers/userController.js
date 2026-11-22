const User = require('../models/User');

// GET /users - получить всех пользователей
const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

// GET /users/:id - получить пользователя по ID
const getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
};

// POST /users - создать нового пользователя
const createUser = async (req, res) => {
  try {
    // Защита от массового присвоения полей
    const { username, email, password, firstName, lastName, role, isActive } = req.body;
    
    // Проверка, что пользователь не может назначить себе роль admin
    if (role && role !== 'user') {
      return res.status(400).json({ 
        error: 'Cannot assign role directly. Only "user" role is allowed for registration.' 
      });
    }
    
    const user = await User.create({
      username,
      email,
      password,
      firstName,
      lastName,
      role: 'user', // Устанавливаем по умолчанию user
      isActive
    });
    
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create user', details: error.message });
  }
};

// PUT /users/:id - обновить пользователя
const updateUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    // Защита от массового присвоения полей
    const { username, email, firstName, lastName, bio, avatar, isActive } = req.body;
    
    // Проверка прав доступа - только владелец или админ может обновлять данные
    if (user.id !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied. Not user owner or admin.' });
    }
    
    // Проверка, что пользователь не может изменить свою роль
    if (req.body.role && req.user.role !== 'admin') {
      return res.status(400).json({ 
        error: 'Cannot change role directly. Only admin can change roles.' 
      });
    }
    
    const updateData = {};
    
    // Разрешенные поля для обновления
    if (username !== undefined) updateData.username = username;
    if (email !== undefined) updateData.email = email;
    if (firstName !== undefined) updateData.firstName = firstName;
    if (lastName !== undefined) updateData.lastName = lastName;
    if (bio !== undefined) updateData.bio = bio;
    if (avatar !== undefined) updateData.avatar = avatar;
    if (isActive !== undefined) updateData.isActive = isActive;
    
    await user.update(updateData);
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update user', details: error.message });
  }
};

// DELETE /users/:id - удалить пользователя
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    // Проверка прав доступа - только владелец или админ может удалять
    if (user.id !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied. Not user owner or admin.' });
    }
    
    await user.destroy();
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};