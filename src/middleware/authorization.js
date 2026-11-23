/**
 * Middleware для проверки ролей пользователя
 * @param {Array} roles - Массив разрешенных ролей. Если не указан, проверяет на наличие авторизации
 * @returns {Function} Middleware функция
 */
export const authorize = (roles = null) => {
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
export const isOwner = () => {
  return (req, res, next) => {
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

    // В реальной реализации здесь будет проверка принадлежности ресурса пользователю
    // Например, проверка в БД, что пользователь является владельцем ресурса
    // В данном примере просто пропускаем запрос (в реальной системе нужно реализовать проверку)
    next();
  };
};

/**
 * Middleware для проверки конкретных прав доступа
 * @param {string} permission - Название права доступа
 * @returns {Function} Middleware функция
 */
export const checkPermission = (permission) => {
  return (req, res, next) => {
    // Проверка наличия пользователя в запросе
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Необходима авторизация'
      });
    }

    // В реальной реализации здесь будет проверка наличия у пользователя конкретного права
    // Например, проверка в БД или в конфигурации
    // В данном примере просто пропускаем запрос (в реальной системе нужно реализовать проверку)
    
    next();
  };
};

/**
 * Middleware для валидации изменений ролей пользователей
 * @returns {Function} Middleware функция
 */
export const validateRoleChange = () => {
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

    // В реальной реализации здесь будет дополнительная проверка:
    // - Запрет на изменение собственной роли
    // - Проверка допустимых ролей для изменения
    // - Проверка на попытку повысить уровень до администратора
    
    next();
  };
};

/**
 * Middleware для проверки прав доступа к ресурсу на основе данных из БД
 * @param {Function} model - Модель данных для проверки
 * @param {string} ownerField - Поле в модели, содержащее ID владельца
 * @returns {Function} Middleware функция
 */
export const checkResourceOwnership = (model, ownerField = 'userId') => {
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
      // const resource = await model.findByPk(resourceId);
      // if (!resource || resource[ownerField] !== req.user.id) {
      //   return res.status(403).json({
      //     success: false,
      //     message: 'Нет доступа к ресурсу'
      //   });
      // }
      
      // В данном примере просто пропускаем запрос
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