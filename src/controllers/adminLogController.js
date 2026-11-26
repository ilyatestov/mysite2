const AdminLog = require('../models/AdminLog');

// GET /admin-logs - получить все админ логи
const getAllAdminLogs = async (req, res) => {
  try {
    const adminLogs = await AdminLog.findAll();
    res.json(adminLogs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch admin logs' });
  }
};

// GET /admin-logs/:id - получить админ лог по ID
const getAdminLogById = async (req, res) => {
  try {
    const adminLog = await AdminLog.findByPk(req.params.id);
    if (!adminLog) {
      return res.status(404).json({ error: 'Admin log not found' });
    }
    res.json(adminLog);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch admin log' });
  }
};

// POST /admin-logs - создать новый админ лог
const createAdminLog = async (req, res) => {
  try {
    const adminLog = await AdminLog.create(req.body);
    res.status(201).json(adminLog);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create admin log', details: error.message });
  }
};

// PUT /admin-logs/:id - обновить админ лог
const updateAdminLog = async (req, res) => {
  try {
    const adminLog = await AdminLog.findByPk(req.params.id);
    if (!adminLog) {
      return res.status(404).json({ error: 'Admin log not found' });
    }
    
    await adminLog.update(req.body);
    res.json(adminLog);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update admin log', details: error.message });
  }
};

// DELETE /admin-logs/:id - удалить админ лог
const deleteAdminLog = async (req, res) => {
  try {
    const adminLog = await AdminLog.findByPk(req.params.id);
    if (!adminLog) {
      return res.status(404).json({ error: 'Admin log not found' });
    }
    
    await adminLog.destroy();
    res.json({ message: 'Admin log deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete admin log' });
  }
};

module.exports = {
  getAllAdminLogs,
  getAdminLogById,
  createAdminLog,
  updateAdminLog,
  deleteAdminLog
};