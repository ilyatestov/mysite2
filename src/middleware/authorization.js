/**
 * Middleware для проверки ролей пользователя
 * @param {Array} roles - Массив разрешенных ролей
 * @returns {Function} Middleware функция
 */
const authorize = (roles = []) => {
  return (req, res, next) => {
    // Проверка аутентификации
    if (!req.user) {
      return res.status(401).json({ 
        error: 'Authentication required' 
      });
    }

    // Если не указаны роли, пропускаем
    if (roles.length === 0) {
      return next();
    }

    // Проверка роли пользователя
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ 
        error: 'Access denied. Insufficient permissions.' 
      });
    }

    next();
  };
};

/**
 * Middleware для проверки принадлежности ресурса пользователю
 * @returns {Function} Middleware функция
 */
const isOwner = () => {
  return (req, res, next) => {
    // Проверка аутентификации
    if (!req.user) {
      return res.status(401).json({ 
        error: 'Authentication required' 
      });
    }

    // Администраторы имеют полный доступ
    if (req.user.role === 'admin') {
      return next();
    }

    // Для других ролей проверяем принадлежность
    // В реальной реализации здесь будет проверка в БД
    
    // Для демонстрации просто пропускаем
    next();
  };
};

/**
 * Middleware для проверки конкретных прав доступа
 * @param {string} permission - Название права доступа
 * @returns {Function} Middleware функция
 */
const checkPermission = (permission) => {
  return (req, res, next) => {
    // Проверка аутентификации
    if (!req.user) {
      return res.status(401).json({ 
        error: 'Authentication required' 
      });
    }

    // В реальной реализации здесь будет проверка конкретного права доступа
    // Например, проверка, что у пользователя есть право на выполнение операции
    
    // Для демонстрации - всегда пропускаем
    next();
  };
};

/**
 * Middleware для валидации изменений ролей
 * @returns {Function} Middleware функция
 */
const validateRoleChange = (req, res, next) => {
  // Проверка аутентификации
  if (!req.user) {
    return res.status(401).json({ 
      error: 'Authentication required' 
    });
  }

  // Только администраторы могут изменять роли пользователей
  if (req.body.role && req.user.role !== 'admin') {
    return res.status(403).json({ 
      error: 'Access denied. Only administrators can change user roles.' 
    });
  }

  next();
};

module.exports = {
  authorize,
  isOwner,
  checkPermission,
  validateRoleChange
};