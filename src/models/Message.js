const { DataTypes } = require('sequelize');
const getSequelizeInstance = require('../config/db');
const sequelize = getSequelizeInstance();

const Message = sequelize.define('Message', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  senderId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  receiverId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  isRead: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false
  },
  isDeletedBySender: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false
  },
  isDeletedByReceiver: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false
  }
}, {
  timestamps: true,
  tableName: 'messages'
});

module.exports = Message;