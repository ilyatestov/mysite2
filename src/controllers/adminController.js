const AdminLog = require('../models/AdminLog');
const User = require('../models/User');
const Post = require('../models/Post');
const Comment = require('../models/Comment');
const Message = require('../models/Message');
const Referral = require('../models/Referral');
const sequelize = require('../config/db');

// GET /admin/logs - получить все административные логи
const getAllAdminLogs = async (req, res) => {
  try {
    // Только администраторы могут просматривать логи
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied. Admin role required.' });
    }
    
    const logs = await AdminLog.findAll({
      include: [{ model: User, as: 'user' }],
      order: [['createdAt', 'DESC']]
    });
    
    res.json(logs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch admin logs' });
  }
};

// GET /admin/logs/:id - получить административный лог по ID
const getAdminLogById = async (req, res) => {
  try {
    // Только администраторы могут просматривать логи
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied. Admin role required.' });
    }
    
    const log = await AdminLog.findByPk(req.params.id);
    if (!log) {
      return res.status(404).json({ error: 'Admin log not found' });
    }
    
    res.json(log);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch admin log' });
  }
};

// POST /admin/logs - создать новый административный лог
const createAdminLog = async (req, res) => {
  try {
    // Только администраторы могут создавать логи
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied. Admin role required.' });
    }
    
    const log = await AdminLog.create({
      ...req.body,
      userId: req.user.id
    });
    
    res.status(201).json(log);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create admin log', details: error.message });
  }
};

// GET /admin/stats - получить статистику системы
const getSystemStats = async (req, res) => {
  try {
    // Только администраторы могут просматривать статистику
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied. Admin role required.' });
    }
    
    const stats = {
      usersCount: await User.count(),
      postsCount: await Post.count(),
      commentsCount: await Comment.count(),
      messagesCount: await Message.count(),
      referralsCount: await Referral.count()
    };
    
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch system stats' });
  }
};

// GET /admin/users/stats - получить статистику пользователей
const getUserStats = async (req, res) => {
  try {
    // Только администраторы могут просматривать статистику
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied. Admin role required.' });
    }
    
    const stats = await User.findAll({
      attributes: [
        'role',
        [sequelize.fn('COUNT', sequelize.col('id')), 'count']
      ],
      group: ['role'],
      order: [['role', 'ASC']]
    });
    
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user stats' });
  }
};

module.exports = {
  getAllAdminLogs,
  getAdminLogById,
  createAdminLog,
  getSystemStats,
  getUserStats
};