// Middleware для проверки ролей пользователя
const authorize = (roles = []) => {
  return (req, res, next) => {
    // Проверяем, что пользователь аутентифицирован
    if (!req.user) {
      return res.status(401).json({ 
        error: 'Authentication required' 
      });
    }

    // Если роли не указаны - разрешаем всем (для публичных маршрутов)
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

module.exports = { authorize };