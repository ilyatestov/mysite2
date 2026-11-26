const { DataTypes } = require('sequelize');
const getSequelizeInstance = require('../config/db');
const sequelize = getSequelizeInstance();

const AdminLog = sequelize.define('AdminLog', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  action: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [1, 100]
    }
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  ipAddress: {
    type: DataTypes.STRING(45),
    allowNull: true
  },
  userAgent: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  targetId: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  targetType: {
    type: DataTypes.STRING(50),
    allowNull: true
  }
}, {
  timestamps: true,
  tableName: 'admin_logs'
});

module.exports = AdminLog;