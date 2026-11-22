const express = require('express');
const router = express.Router();
const { getAllAdminLogs, getAdminLogById, createAdminLog, updateAdminLog, deleteAdminLog } = require('../controllers/adminLogController');
const { authorize } = require('../middleware/authorization');

// GET /admin-logs - получить все админ логи (только админ)
router.get('/', authorize(['admin']), getAllAdminLogs);

// GET /admin-logs/:id - получить админ лог по ID (только админ)
router.get('/:id', authorize(['admin']), getAdminLogById);

// POST /admin-logs - создать новый админ лог (только админ)
router.post('/', authorize(['admin']), createAdminLog);

// PUT /admin-logs/:id - обновить админ лог (только админ)
router.put('/:id', authorize(['admin']), updateAdminLog);

// DELETE /admin-logs/:id - удалить админ лог (только админ)
router.delete('/:id', authorize(['admin']), deleteAdminLog);

module.exports = router;