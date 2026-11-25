const Post = require('../models/Post');

// GET /posts - получить все посты
const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.findAll();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
};

// GET /posts/:id - получить пост по ID
const getPostById = async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch post' });
  }
};

// POST /posts - создать новый пост
const createPost = async (req, res) => {
  try {
    // Защита от массового присвоения полей
    const { title, content, categoryId, tags, status } = req.body;
    
    // Проверка, что автор поста устанавливается сервером
    if (req.body.authorId) {
      return res.status(400).json({ 
        error: 'Cannot set authorId directly. It will be set by the server.' 
      });
    }
    
    // Проверка статуса публикации
    const allowedStatuses = ['draft', 'published', 'archived'];
    if (status && !allowedStatuses.includes(status)) {
      return res.status(400).json({ 
        error: 'Invalid status. Allowed statuses: draft, published, archived' 
      });
    }
    
    const post = await Post.create({
      title,
      content,
      categoryId,
      tags,
      status: status || 'draft',
      authorId: req.user.id // Устанавливаем автора из токена
    });
    
    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create post', details: error.message });
  }
};

// PUT /posts/:id - обновить пост
const updatePost = async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    
    // Защита от массового присвоения полей
    const { title, content, categoryId, tags, status } = req.body;
    
    // Проверка, что authorId не меняется
    if (req.body.authorId) {
      return res.status(400).json({ 
        error: 'Cannot change authorId. It is managed by the system.' 
      });
    }
    
    // Проверка статуса публикации
    const allowedStatuses = ['draft', 'published', 'archived'];
    if (status && !allowedStatuses.includes(status)) {
      return res.status(400).json({ 
        error: 'Invalid status. Allowed statuses: draft, published, archived' 
      });
    }
    
    const updateData = {};
    
    // Разрешенные поля для обновления
    if (title !== undefined) updateData.title = title;
    if (content !== undefined) updateData.content = content;
    if (categoryId !== undefined) updateData.categoryId = categoryId;
    if (tags !== undefined) updateData.tags = tags;
    if (status !== undefined) updateData.status = status;
    
    await post.update(updateData);
    res.json(post);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update post', details: error.message });
  }
};

// DELETE /posts/:id - удалить пост
const deletePost = async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    
    await post.destroy();
    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete post' });
  }
};

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost
};