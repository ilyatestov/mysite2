const Referral = require('../models/Referral');
const User = require('../models/User');

// GET /referrals - получить все рефералы
const getAllReferrals = async (req, res) => {
  try {
    const referrals = await Referral.findAll();
    res.json(referrals);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch referrals' });
  }
};

// GET /referrals/:id - получить реферала по ID
const getReferralById = async (req, res) => {
  try {
    const referral = await Referral.findByPk(req.params.id);
    if (!referral) {
      return res.status(404).json({ error: 'Referral not found' });
    }
    
    // Проверка доступа к рефералу
    if (referral.referrerId !== req.user.id && referral.referredId !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied. Not referral referrer or referred.' });
    }
    
    res.json(referral);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch referral' });
  }
};

// POST /referrals - создать новый реферал
const createReferral = async (req, res) => {
  try {
    const { referrerId, referredId, referralCode } = req.body;
    
    if (!referrerId || !referredId) {
      return res.status(400).json({ error: 'ReferrerId and referredId are required' });
    }
    
    // Проверка существования пользователей
    const referrerExists = await User.findByPk(referrerId);
    if (!referrerExists) {
      return res.status(400).json({ error: 'Referrer not found' });
    }
    
    const referredExists = await User.findByPk(referredId);
    if (!referredExists) {
      return res.status(400).json({ error: 'Referred not found' });
    }
    
    // Проверка доступа к созданию реферала
    if (referrerId !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied. Not referral referrer.' });
    }
    
    // Создание реферала с уникальным кодом если не указано
    let code = referralCode;
    if (!code) {
      const user = await User.findByPk(referrerId);
      code = user.generateReferralCode();
      
      // Проверка уникальности кода
      const existingReferral = await Referral.findOne({
        where: { referralCode: code }
      });
      if (existingReferral) {
        return res.status(400).json({ error: 'Generated referral code already exists' });
      }
    }
    
    const referral = await Referral.create({
      ...req.body,
      referralCode: code
    });
    
    res.status(201).json(referral);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create referral', details: error.message });
  }
};

// PUT /referrals/:id - обновить реферал
const updateReferral = async (req, res) => {
  try {
    const referral = await Referral.findByPk(req.params.id);
    if (!referral) {
      return res.status(404).json({ error: 'Referral not found' });
    }
    
    // Проверка доступа к рефералу
    if (referral.referrerId !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied. Not referral referrer.' });
    }
    
    await referral.update(req.body);
    res.json(referral);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update referral', details: error.message });
  }
};

// DELETE /referrals/:id - удалить реферал
const deleteReferral = async (req, res) => {
  try {
    const referral = await Referral.findByPk(req.params.id);
    if (!referral) {
      return res.status(404).json({ error: 'Referral not found' });
    }
    
    // Проверка доступа к рефералу
    if (referral.referrerId !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied. Not referral referrer.' });
    }
    
    await referral.destroy();
    res.json({ message: 'Referral deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete referral' });
  }
};

// GET /referrals/user/:userId - получить рефералы пользователя
const getReferralsByUser = async (req, res) => {
  try {
    const referrals = await Referral.findAll({
      where: { 
        $or: [
          { referrerId: req.params.userId },
          { referredId: req.params.userId }
        ]
      },
      include: [
        { model: User, as: 'referrer' },
        { model: User, as: 'referred' }
      ],
      order: [['createdAt', 'DESC']]
    });
    
    res.json(referrals);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch referrals for user' });
  }
};

// GET /referrals/code/:code - получить реферала по коду
const getReferralByCode = async (req, res) => {
  try {
    const referral = await Referral.findOne({
      where: { referralCode: req.params.code },
      include: [
        { model: User, as: 'referrer' },
        { model: User, as: 'referred' }
      ]
    });
    
    if (!referral) {
      return res.status(404).json({ error: 'Referral code not found' });
    }
    
    res.json(referral);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch referral by code' });
  }
};

// PUT /referrals/:id/activate - активировать реферал
const activateReferral = async (req, res) => {
  try {
    const referral = await Referral.findByPk(req.params.id);
    if (!referral) {
      return res.status(404).json({ error: 'Referral not found' });
    }
    
    // Проверка доступа к рефералу
    if (referral.referrerId !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied. Not referral referrer.' });
    }
    
    await referral.update({ status: 'active' });
    res.json(referral);
  } catch (error) {
    res.status(500).json({ error: 'Failed to activate referral' });
  }
};

module.exports = {
  getAllReferrals,
  getReferralById,
  createReferral,
  updateReferral,
  deleteReferral,
  getReferralsByUser,
  getReferralByCode,
  activateReferral
};