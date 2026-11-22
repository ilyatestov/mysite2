const express = require('express');
const router = express.Router();
const { getAllAdminLogs, getAdminLogById, createAdminLog, updateAdminLog, deleteAdminLog } = require('../controllers/adminLogController');

// GET /admin-logs - получить все админ логи
router.get('/', getAllAdminLogs);

// GET /admin-logs/:id - получить админ лог по ID
router.get('/:id', getAdminLogById);

// POST /admin-logs - создать новый админ лог
router.post('/', createAdminLog);

// PUT /admin-logs/:id - обновить админ лог
router.put('/:id', updateAdminLog);

// DELETE /admin-logs/:id - удалить админ лог
router.delete('/:id', deleteAdminLog);

module.exports = router;