const express = require('express');
const router = express.Router();
const { getAllUsers, getUserById, createUser, updateUser, deleteUser } = require('../controllers/userController');
const { validateUser } = require('../middleware/validation');
const { authorize, isOwner, validateRoleChange } = require('../middleware/authorization');

// GET /users - получить всех пользователей (только для администраторов)
router.get('/', authorize(['admin']), getAllUsers);

// GET /users/:id - получить пользователя по ID (доступ для владельца или администратора)
router.get('/:id', authorize(['user', 'moderator', 'admin']), isOwner(), getUserById);

// POST /users - создать нового пользователя (публичный маршрут)
router.post('/', validateUser, createUser);

// PUT /users/:id - обновить пользователя (только владелец или администратор)
router.put('/:id', 
  authorize(['user', 'moderator', 'admin']), 
  isOwner(), 
  validateUser, 
  validateRoleChange,
  updateUser
);

// DELETE /users/:id - удалить пользователя (только владелец или администратор)
router.delete('/:id', 
  authorize(['user', 'moderator', 'admin']), 
  isOwner(), 
  deleteUser
);

module.exports = router;