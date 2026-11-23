const express = require('express');
const router = express.Router();
const { getAllReferrals, getReferralById, createReferral, updateReferral, deleteReferral, getReferralsByUser, getReferralByCode, activateReferral } = require('../controllers/referralController');
const { validateReferral } = require('../middleware/validation');
const { authorize, isOwner } = require('../middleware/authorization');

// GET /referrals - получить все рефералы (только для администраторов)
router.get('/', authorize(['admin']), getAllReferrals);

// GET /referrals/:id - получить реферала по ID (только для владельца или администратора)
router.get('/:id', authorize(['user', 'moderator', 'admin']), isOwner(), getReferralById);

// POST /referrals - создать новый реферал (только для авторизованных пользователей)
router.post('/', authorize(['user', 'moderator', 'admin']), validateReferral, createReferral);

// PUT /referrals/:id - обновить реферал (только для владельца или администратора)
router.put('/:id', 
  authorize(['user', 'moderator', 'admin']), 
  isOwner(), 
  validateReferral, 
  updateReferral
);

// DELETE /referrals/:id - удалить реферал (только для владельца или администратора)
router.delete('/:id', 
  authorize(['user', 'moderator', 'admin']), 
  isOwner(), 
  deleteReferral
);

// GET /referrals/user/:userId - получить рефералы пользователя (только для владельца или администратора)
router.get('/user/:userId', authorize(['user', 'moderator', 'admin']), isOwner(), getReferralsByUser);

// GET /referrals/code/:code - получить реферала по коду (публичный маршрут)
router.get('/code/:code', getReferralByCode);

// PUT /referrals/:id/activate - активировать реферал (только для владельца или администратора)
router.put('/:id/activate', authorize(['user', 'moderator', 'admin']), isOwner(), activateReferral);

module.exports = router;