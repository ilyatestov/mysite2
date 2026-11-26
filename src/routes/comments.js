const express = require('express');
const router = express.Router();
const { getAllComments, getCommentById, createComment, updateComment, deleteComment, getCommentsByPost } = require('../controllers/commentController');
const { validateComment } = require('../middleware/validation');
const { authenticate, authorize, isOwner } = require('../middleware/auth');
const Comment = require('../models/Comment');

// GET /comments - получить все комментарии (только для администраторов)
router.get('/', authenticate, authorize(['admin']), getAllComments);

// GET /comments/:id - получить комментарий по ID (только для владельца или администратора)
router.get('/:id', authenticate, authorize(['user', 'moderator', 'admin']), isOwner(Comment), getCommentById);

// POST /comments - создать новый комментарий (только для авторизованных пользователей)
router.post('/', authenticate, authorize(['user', 'moderator', 'admin']), validateComment, createComment);

// PUT /comments/:id - обновить комментарий (только для владельца или администратора)
router.put('/:id', 
  authenticate,
  authorize(['user', 'moderator', 'admin']), 
  isOwner(Comment), 
  validateComment, 
  updateComment
);

// DELETE /comments/:id - удалить комментарий (только для владельца или администратора)
router.delete('/:id', 
  authenticate,
  authorize(['user', 'moderator', 'admin']), 
  isOwner(Comment), 
  deleteComment
);

// GET /posts/:postId/comments - получить комментарии к посту (публичный маршрут)
router.get('/post/:postId', getCommentsByPost);

module.exports = router;