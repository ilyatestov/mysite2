const express = require('express');
const router = express.Router();
const { getAllPosts, getPostById, createPost, updatePost, deletePost } = require('../controllers/postController');
const { validatePost } = require('../middleware/validation');

// GET /posts - получить все посты
router.get('/', getAllPosts);

// GET /posts/:id - получить пост по ID
router.get('/:id', getPostById);

// POST /posts - создать новый пост
router.post('/', validatePost, createPost);

// PUT /posts/:id - обновить пост
router.put('/:id', validatePost, updatePost);

// DELETE /posts/:id - удалить пост
router.delete('/:id', deletePost);

module.exports = router;