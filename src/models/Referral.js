const { DataTypes } = require('sequelize');
const getSequelizeInstance = require('../config/db');
const sequelize = getSequelizeInstance();

const Referral = sequelize.define('Referral', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  referrerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  referredId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  referralCode: {
    type: DataTypes.STRING(50),
    allowNull: false,
    validate: {
      len: [6, 50]
    }
  },
  status: {
    type: DataTypes.ENUM('pending', 'active', 'expired'),
    defaultValue: 'pending',
    allowNull: false
  }
}, {
  timestamps: true,
  tableName: 'referrals'
});

module.exports = Referral;