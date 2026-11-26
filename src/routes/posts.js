const express = require('express');
const router = express.Router();
const { getAllPosts, getPostById, createPost, updatePost, deletePost } = require('../controllers/postController');
const { validatePost } = require('../middleware/validation');
const { authenticate, authorize, isOwner } = require('../middleware/auth');
const Post = require('../models/Post');

// GET /posts - получить все посты (публичный маршрут)
router.get('/', getAllPosts);

// GET /posts/:id - получить пост по ID (публичный маршрут)
router.get('/:id', getPostById);

// POST /posts - создать новый пост (только для авторизованных пользователей)
router.post('/', authenticate, authorize(['user', 'moderator', 'admin']), validatePost, createPost);

// PUT /posts/:id - обновить пост (только владелец или администратор)
router.put('/:id', 
  authenticate,
  authorize(['user', 'moderator', 'admin']), 
  isOwner(Post), 
  validatePost, 
  updatePost
);

// DELETE /posts/:id - удалить пост (только владелец или администратор)
router.delete('/:id', 
  authenticate,
  authorize(['user', 'moderator', 'admin']), 
  isOwner(Post), 
  deletePost
);

module.exports = router;