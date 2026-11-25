const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authenticate = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ 
        error: 'Access denied. No token provided.' 
      });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Проверяем, что пользователь всё ещё существует и активен
    const user = await User.findByPk(decoded.id);
    if (!user || !user.isActive) {
      return res.status(401).json({ 
        error: 'Invalid token. User not found or inactive.' 
      });
    }
    
    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ 
        error: 'Token expired.' 
      });
    }
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ 
        error: 'Invalid token.' 
      });
    }
    res.status(400).json({ 
      error: 'Invalid token format.' 
    });
  }
};

const authorize = (roles = []) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ 
        error: 'Access denied. No user authenticated.' 
      });
    }
    
    // Если роли не указаны - разрешаем всем
    if (roles.length === 0) {
      return next();
    }
    
    // Проверяем, что пользователь имеет нужную роль
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ 
        error: 'Access denied. Insufficient permissions.' 
      });
    }
    
    next();
  };
};

const isOwner = (model, ownerField = 'userId') => {
  return async (req, res, next) => {
    // Проверка наличия пользователя в запросе
    if (!req.user) {
      return res.status(401).json({ 
        error: 'Access denied. No user authenticated.' 
      });
    }

    // Проверка наличия ID ресурса в параметрах запроса
    const resourceId = req.params.id;
    if (!resourceId) {
      return res.status(400).json({ 
        error: 'Resource ID not provided.' 
      });
    }

    // Для администраторов всегда разрешен доступ
    if (req.user.role === 'admin') {
      return next();
    }

    try {
      // В реальной реализации здесь будет запрос к БД для проверки принадлежности
      const resource = await model.findByPk(resourceId);
      if (!resource) {
        return res.status(404).json({ 
          error: 'Resource not found.' 
        });
      }
      
      // Проверяем, принадлежит ли ресурс пользователю
      // Для Referral используем специальную логику для referrerId и referredId
      if (model.name === 'Referral') {
        // Для рефералов проверяем оба поля: referrerId и referredId
        if (resource.referrerId !== req.user.id && resource.referredId !== req.user.id) {
          return res.status(403).json({ 
            error: 'Access denied. You do not own this resource.' 
          });
        }
      } else {
        // Для других моделей используем стандартную проверку
        if (resource[ownerField] !== req.user.id) {
          return res.status(403).json({ 
            error: 'Access denied. You do not own this resource.' 
          });
        }
      }
      
      next();
    } catch (error) {
      return res.status(500).json({ 
        error: 'Error checking resource ownership.', 
        message: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  };
};

const validateRoleChange = () => {
  return (req, res, next) => {
    // Проверка наличия пользователя в запросе
    if (!req.user) {
      return res.status(401).json({ 
        error: 'Access denied. No user authenticated.' 
      });
    }

    // Только администраторы могут изменять роли пользователей
    if (req.user.role !== 'admin') {
      return res.status(403).json({ 
        error: 'Access denied. Insufficient permissions to change roles.' 
      });
    }

    // Проверка, что пользователь не пытается изменить свою собственную роль
    if (req.params.id && parseInt(req.params.id) === req.user.id) {
      return res.status(400).json({ 
        error: 'You cannot change your own role.' 
      });
    }

    next();
  };
};

module.exports = { 
  authenticate, 
  authorize, 
  isOwner, 
  validateRoleChange 
};