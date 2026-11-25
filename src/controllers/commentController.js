const Comment = require('../models/Comment');
const User = require('../models/User');
const Post = require('../models/Post');

// GET /comments - получить все комментарии
const getAllComments = async (req, res) => {
  try {
    const comments = await Comment.findAll();
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch comments' });
  }
};

// GET /comments/:id - получить комментарий по ID
const getCommentById = async (req, res) => {
  try {
    const comment = await Comment.findByPk(req.params.id);
    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }
    res.json(comment);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch comment' });
  }
};

// POST /comments - создать новый комментарий
const createComment = async (req, res) => {
  try {
    // Защита от массового присвоения полей
    const { content, postId } = req.body;
    
    if (!content || !postId) {
      return res.status(400).json({ error: 'Content and postId are required' });
    }
    
    // Проверка существования поста
    const postExists = await Post.findByPk(postId);
    if (!postExists) {
      return res.status(400).json({ error: 'Post not found' });
    }
    
    // Проверка, что authorId устанавливается сервером
    if (req.body.authorId) {
      return res.status(400).json({ 
        error: 'Cannot set authorId directly. It will be set by the server.' 
      });
    }
    
    // Проверка, что isApproved не устанавливается при создании
    if (req.body.isApproved !== undefined) {
      return res.status(400).json({ 
        error: 'Cannot set isApproved directly. It will be set by moderators.' 
      });
    }
    
    const comment = await Comment.create({
      content,
      postId,
      authorId: req.user.id, // Устанавливаем автора из токена
      isApproved: false // Комментарии по умолчанию не одобрены
    });
    
    res.status(201).json(comment);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create comment', details: error.message });
  }
};

// PUT /comments/:id - обновить комментарий
const updateComment = async (req, res) => {
  try {
    const comment = await Comment.findByPk(req.params.id);
    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }
    
    // Проверка авторства комментария
    if (comment.authorId !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied. Not comment author or admin.' });
    }
    
    // Защита от массового присвоения полей
    const { content, isApproved } = req.body;
    
    // Проверка, что authorId не меняется
    if (req.body.authorId) {
      return res.status(400).json({ 
        error: 'Cannot change authorId. It is managed by the system.' 
      });
    }
    
    // Проверка, что isApproved меняется только модераторами
    if (isApproved !== undefined && req.user.role !== 'moderator' && req.user.role !== 'admin') {
      return res.status(403).json({ 
        error: 'Access denied. Only moderators and admins can change isApproved.' 
      });
    }
    
    const updateData = {};
    
    // Разрешенные поля для обновления
    if (content !== undefined) updateData.content = content;
    if (isApproved !== undefined) updateData.isApproved = isApproved;
    
    await comment.update(updateData);
    res.json(comment);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update comment', details: error.message });
  }
};

// DELETE /comments/:id - удалить комментарий
const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findByPk(req.params.id);
    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }
    
    // Проверка авторства комментария
    if (comment.authorId !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied. Not comment author or admin.' });
    }
    
    await comment.destroy();
    res.json({ message: 'Comment deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete comment' });
  }
};

// GET /posts/:postId/comments - получить комментарии к посту
const getCommentsByPost = async (req, res) => {
  try {
    const comments = await Comment.findAll({
      where: { postId: req.params.postId },
      include: [{ model: User, as: 'author' }]
    });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch comments for post' });
  }
};

module.exports = {
  getAllComments,
  getCommentById,
  createComment,
  updateComment,
  deleteComment,
  getCommentsByPost
};