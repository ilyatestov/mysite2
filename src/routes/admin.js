const express = require('express');
const router = express.Router();
const { getAllAdminLogs, getAdminLogById, createAdminLog, getSystemStats, getUserStats } = require('../controllers/adminController');
const { authorize } = require('../middleware/authorization');

// GET /admin/logs - получить все административные логи (только админ)
router.get('/logs', authorize(['admin']), getAllAdminLogs);

// GET /admin/logs/:id - получить административный лог по ID (только админ)
router.get('/logs/:id', authorize(['admin']), getAdminLogById);

// POST /admin/logs - создать новый административный лог (только админ)
router.post('/logs', authorize(['admin']), createAdminLog);

// GET /admin/stats - получить статистику системы (только админ)
router.get('/stats', authorize(['admin']), getSystemStats);

// GET /admin/users/stats - получить статистику пользователей (только админ)
router.get('/users/stats', authorize(['admin']), getUserStats);

module.exports = router;