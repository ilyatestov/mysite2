const express = require('express');
const router = express.Router();
const { getAllReferrals, getReferralById, createReferral, updateReferral, deleteReferral, getReferralsByUser, getReferralByCode, activateReferral } = require('../controllers/referralController');

// GET /referrals - получить все рефералы
router.get('/', getAllReferrals);

// GET /referrals/:id - получить реферала по ID
router.get('/:id', getReferralById);

// POST /referrals - создать новый реферал
router.post('/', createReferral);

// PUT /referrals/:id - обновить реферал
router.put('/:id', updateReferral);

// DELETE /referrals/:id - удалить реферал
router.delete('/:id', deleteReferral);

// GET /referrals/user/:userId - получить рефералы пользователя
router.get('/user/:userId', getReferralsByUser);

// GET /referrals/code/:code - получить реферала по коду
router.get('/code/:code', getReferralByCode);

// PUT /referrals/:id/activate - активировать реферал
router.put('/:id/activate', activateReferral);

module.exports = router;