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
    const { content, authorId, postId } = req.body;
    
    if (!content || !authorId || !postId) {
      return res.status(400).json({ error: 'Content, authorId and postId are required' });
    }
    
    // Проверка существования автора и поста
    const userExists = await User.findByPk(authorId);
    if (!userExists) {
      return res.status(400).json({ error: 'Author not found' });
    }
    
    const postExists = await Post.findByPk(postId);
    if (!postExists) {
      return res.status(400).json({ error: 'Post not found' });
    }
    
    const comment = await Comment.create(req.body);
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
    
    await comment.update(req.body);
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