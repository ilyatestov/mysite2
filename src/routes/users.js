const express = require('express');
const router = express.Router();
const { getAllUsers, getUserById, createUser, updateUser, deleteUser } = require('../controllers/userController');
const { validateUser } = require('../middleware/validation');

// GET /users - получить всех пользователей
router.get('/', getAllUsers);

// GET /users/:id - получить пользователя по ID
router.get('/:id', getUserById);

// POST /users - создать нового пользователя
router.post('/', validateUser, createUser);

// PUT /users/:id - обновить пользователя
router.put('/:id', validateUser, updateUser);

// DELETE /users/:id - удалить пользователя
router.delete('/:id', deleteUser);

module.exports = router;