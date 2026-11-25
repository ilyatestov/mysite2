const express = require('express');
const router = express.Router();
const { getAllTags, getTagById, createTag, updateTag, deleteTag } = require('../controllers/tagController');
const { validateTag } = require('../middleware/validation');
const { authenticate, authorize } = require('../middleware/auth');

// GET /tags - получить все теги (публичный маршрут)
router.get('/', getAllTags);

// GET /tags/:id - получить тег по ID (публичный маршрут)
router.get('/:id', getTagById);

// POST /tags - создать новый тег (только для модераторов и администраторов)
router.post('/', authenticate, authorize(['moderator', 'admin']), validateTag, createTag);

// PUT /tags/:id - обновить тег (только для модераторов и администраторов)
router.put('/:id', authenticate, authorize(['moderator', 'admin']), validateTag, updateTag);

// DELETE /tags/:id - удалить тег (только для модераторов и администраторов)
router.delete('/:id', authenticate, authorize(['moderator', 'admin']), deleteTag);

module.exports = router;