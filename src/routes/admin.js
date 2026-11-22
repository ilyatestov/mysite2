const express = require('express');
const router = express.Router();
const { getAllAdminLogs, getAdminLogById, createAdminLog, getSystemStats, getUserStats } = require('../controllers/adminController');

// GET /admin/logs - получить все административные логи
router.get('/logs', getAllAdminLogs);

// GET /admin/logs/:id - получить административный лог по ID
router.get('/logs/:id', getAdminLogById);

// POST /admin/logs - создать новый административный лог
router.post('/logs', createAdminLog);

// GET /admin/stats - получить статистику системы
router.get('/stats', getSystemStats);

// GET /admin/users/stats - получить статистику пользователей
router.get('/users/stats', getUserStats);

module.exports = router;