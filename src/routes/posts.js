const express = require('express');
const router = express.Router();
const { getAllPosts, getPostById, createPost, updatePost, deletePost } = require('../controllers/postController');
const { validatePost } = require('../middleware/validation');
const { authorize, isOwner } = require('../middleware/authorization');

// GET /posts - получить все посты (публичный маршрут)
router.get('/', getAllPosts);

// GET /posts/:id - получить пост по ID (публичный маршрут)
router.get('/:id', getPostById);

// POST /posts - создать новый пост (только для авторизованных пользователей)
router.post('/', authorize(['user', 'moderator', 'admin']), validatePost, createPost);

// PUT /posts/:id - обновить пост (только владелец или администратор)
router.put('/:id', 
  authorize(['user', 'moderator', 'admin']), 
  isOwner(), 
  validatePost, 
  updatePost
);

// DELETE /posts/:id - удалить пост (только владелец или администратор)
router.delete('/:id', 
  authorize(['user', 'moderator', 'admin']), 
  isOwner(), 
  deletePost
);

module.exports = router;