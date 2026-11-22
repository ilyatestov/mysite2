const express = require('express');
const router = express.Router();
const { getAllTags, getTagById, createTag, updateTag, deleteTag } = require('../controllers/tagController');

// GET /tags - получить все теги
router.get('/', getAllTags);

// GET /tags/:id - получить тег по ID
router.get('/:id', getTagById);

// POST /tags - создать новый тег
router.post('/', createTag);

// PUT /tags/:id - обновить тег
router.put('/:id', updateTag);

// DELETE /tags/:id - удалить тег
router.delete('/:id', deleteTag);

module.exports = router;