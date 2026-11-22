const express = require('express');
const router = express.Router();
const { getAllCategories, getCategoryById, createCategory, updateCategory, deleteCategory } = require('../controllers/categoryController');

// GET /categories - получить все категории
router.get('/', getAllCategories);

// GET /categories/:id - получить категорию по ID
router.get('/:id', getCategoryById);

// POST /categories - создать новую категорию
router.post('/', createCategory);

// PUT /categories/:id - обновить категорию
router.put('/:id', updateCategory);

// DELETE /categories/:id - удалить категорию
router.delete('/:id', deleteCategory);

module.exports = router;