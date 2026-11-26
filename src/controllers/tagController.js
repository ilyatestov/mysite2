const Tag = require('../models/Tag');

// GET /tags - получить все теги
const getAllTags = async (req, res) => {
  try {
    const tags = await Tag.findAll();
    res.json(tags);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tags' });
  }
};

// GET /tags/:id - получить тег по ID
const getTagById = async (req, res) => {
  try {
    const tag = await Tag.findByPk(req.params.id);
    if (!tag) {
      return res.status(404).json({ error: 'Tag not found' });
    }
    res.json(tag);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tag' });
  }
};

// POST /tags - создать новый тег
const createTag = async (req, res) => {
  try {
    const tag = await Tag.create(req.body);
    res.status(201).json(tag);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create tag', details: error.message });
  }
};

// PUT /tags/:id - обновить тег
const updateTag = async (req, res) => {
  try {
    const tag = await Tag.findByPk(req.params.id);
    if (!tag) {
      return res.status(404).json({ error: 'Tag not found' });
    }
    
    await tag.update(req.body);
    res.json(tag);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update tag', details: error.message });
  }
};

// DELETE /tags/:id - удалить тег
const deleteTag = async (req, res) => {
  try {
    const tag = await Tag.findByPk(req.params.id);
    if (!tag) {
      return res.status(404).json({ error: 'Tag not found' });
    }
    
    await tag.destroy();
    res.json({ message: 'Tag deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete tag' });
  }
};

module.exports = {
  getAllTags,
  getTagById,
  createTag,
  updateTag,
  deleteTag
};