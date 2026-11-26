const express = require('express');
const router = express.Router();
const { getAllUsers, getUserById, createUser, updateUser, deleteUser } = require('../controllers/userController');
const { validateUser } = require('../middleware/validation');
const { authenticate, authorize, isOwner, validateRoleChange } = require('../middleware/auth');
const User = require('../models/User');

// GET /users - получить всех пользователей (только для администраторов)
router.get('/', authenticate, authorize(['admin']), getAllUsers);

// GET /users/:id - получить пользователя по ID (доступ для владельца или администратора)
router.get('/:id', authenticate, authorize(['user', 'moderator', 'admin']), isOwner(User), getUserById);

// POST /users - создать нового пользователя (публичный маршрут)
router.post('/', validateUser, createUser);

// PUT /users/:id - обновить пользователя (только владелец или администратор)
router.put('/:id', 
  authenticate,
  authorize(['user', 'moderator', 'admin']), 
  isOwner(User), 
  validateUser, 
  validateRoleChange,
  updateUser
);

// DELETE /users/:id - удалить пользователя (только владелец или администратор)
router.delete('/:id', 
  authenticate,
  authorize(['user', 'moderator', 'admin']), 
  isOwner(User), 
  deleteUser
);

module.exports = router;