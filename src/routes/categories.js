const express = require('express');
const router = express.Router();
const { getAllCategories, getCategoryById, createCategory, updateCategory, deleteCategory } = require('../controllers/categoryController');
const { validateCategory } = require('../middleware/validation');
const { authenticate, authorize } = require('../middleware/auth');

// GET /categories - получить все категории (публичный маршрут)
router.get('/', getAllCategories);

// GET /categories/:id - получить категорию по ID (публичный маршрут)
router.get('/:id', getCategoryById);

// POST /categories - создать новую категорию (только для модераторов и администраторов)
router.post('/', authenticate, authorize(['moderator', 'admin']), validateCategory, createCategory);

// PUT /categories/:id - обновить категорию (только для модераторов и администраторов)
router.put('/:id', authenticate, authorize(['moderator', 'admin']), validateCategory, updateCategory);

// DELETE /categories/:id - удалить категорию (только для модераторов и администраторов)
router.delete('/:id', authenticate, authorize(['moderator', 'admin']), deleteCategory);

module.exports = router;