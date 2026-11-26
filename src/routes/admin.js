const express = require('express');
const router = express.Router();
const { getAllAdminLogs, getAdminLogById, createAdminLog, getSystemStats, getUserStats } = require('../controllers/adminController');
const { authenticate, authorize } = require('../middleware/auth');

// GET /admin/logs - получить все административные логи (только админ)
router.get('/logs', authenticate, authorize(['admin']), getAllAdminLogs);

// GET /admin/logs/:id - получить административный лог по ID (только админ)
router.get('/logs/:id', authenticate, authorize(['admin']), getAdminLogById);

// POST /admin/logs - создать новый административный лог (только админ)
router.post('/logs', authenticate, authorize(['admin']), createAdminLog);

// GET /admin/stats - получить статистику системы (только админ)
router.get('/stats', authenticate, authorize(['admin']), getSystemStats);

// GET /admin/users/stats - получить статистику пользователей (только админ)
router.get('/users/stats', authenticate, authorize(['admin']), getUserStats);

module.exports = router;