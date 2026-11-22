const express = require('express');
const router = express.Router();
const { getAllComments, getCommentById, createComment, updateComment, deleteComment, getCommentsByPost } = require('../controllers/commentController');

// GET /comments - получить все комментарии
router.get('/', getAllComments);

// GET /comments/:id - получить комментарий по ID
router.get('/:id', getCommentById);

// POST /comments - создать новый комментарий
router.post('/', createComment);

// PUT /comments/:id - обновить комментарий
router.put('/:id', updateComment);

// DELETE /comments/:id - удалить комментарий
router.delete('/:id', deleteComment);

// GET /posts/:postId/comments - получить комментарии к посту
router.get('/post/:postId', getCommentsByPost);

module.exports = router;