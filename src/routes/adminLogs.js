const express = require('express');
const router = express.Router();
const { getAllAdminLogs, getAdminLogById, createAdminLog, updateAdminLog, deleteAdminLog } = require('../controllers/adminLogController');
const { authenticate, authorize } = require('../middleware/auth');

// GET /admin-logs - получить все админ логи (только админ)
router.get('/', authenticate, authorize(['admin']), getAllAdminLogs);

// GET /admin-logs/:id - получить админ лог по ID (только админ)
router.get('/:id', authenticate, authorize(['admin']), getAdminLogById);

// POST /admin-logs - создать новый админ лог (только админ)
router.post('/', authenticate, authorize(['admin']), createAdminLog);

// PUT /admin-logs/:id - обновить админ лог (только админ)
router.put('/:id', authenticate, authorize(['admin']), updateAdminLog);

// DELETE /admin-logs/:id - удалить админ лог (только админ)
router.delete('/:id', authenticate, authorize(['admin']), deleteAdminLog);

module.exports = router;