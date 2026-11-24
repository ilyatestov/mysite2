/**
 * Middleware для проверки ролей пользователя
 * @param {Array} roles - Массив разрешенных ролей. Если не указан, проверяет на наличие авторизации
 * @returns {Function} Middleware функция
 */
const authorize = (roles = null) => {
  return (req, res, next) => {
    // Проверка наличия пользователя в запросе (должен быть установлен middleware auth)
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Необходима авторизация'
      });
    }

    // Если роли не указаны, просто проверяем авторизацию
    if (!roles || roles.length === 0) {
      return next();
    }

    // Проверяем, есть ли у пользователя нужная роль
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: 'Недостаточно прав для выполнения операции'
      });
    }

    next();
  };
};

/**
 * Middleware для проверки принадлежности ресурса пользователю
 * @returns {Function} Middleware функция
 */
const isOwner = (model, ownerField = 'userId') => {
  return async (req, res, next) => {
    // Проверка наличия пользователя в запросе
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Необходима авторизация'
      });
    }

    // Проверка наличия ID ресурса в параметрах запроса
    const resourceId = req.params.id;
    if (!resourceId) {
      return res.status(400).json({
        success: false,
        message: 'ID ресурса не указан'
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
          success: false,
          message: 'Ресурс не найден'
        });
      }
      
      // Проверяем, принадлежит ли ресурс пользователю
      // Для Referral используем специальную логику для referrerId и referredId
      if (model.name === 'Referral') {
        // Для рефералов проверяем оба поля: referrerId и referredId
        if (resource.referrerId !== req.user.id && resource.referredId !== req.user.id) {
          return res.status(403).json({
            success: false,
            message: 'Нет доступа к ресурсу'
          });
        }
      } else {
        // Для других моделей используем стандартную проверку
        if (resource[ownerField] !== req.user.id) {
          return res.status(403).json({
            success: false,
            message: 'Нет доступа к ресурсу'
          });
        }
      }
      
      next();
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Ошибка проверки доступа к ресурсу',
        error: error.message
      });
    }
  };
};

/**
 * Middleware для валидации изменений ролей пользователей
 * @returns {Function} Middleware функция
 */
const validateRoleChange = () => {
  return (req, res, next) => {
    // Проверка наличия пользователя в запросе
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Необходима авторизация'
      });
    }

    // Только администраторы могут изменять роли пользователей
    if (req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Недостаточно прав для изменения ролей пользователей'
      });
    }

    // Проверка, что пользователь не пытается изменить свою собственную роль
    if (req.params.id && parseInt(req.params.id) === req.user.id) {
      return res.status(400).json({
        success: false,
        message: 'Нельзя изменить собственную роль'
      });
    }

    next();
  };
};

module.exports = {
  authorize,
  isOwner,
  validateRoleChange
};