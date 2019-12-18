const db = require('../config/db');
const Sequelize = require('sequelize');
const User = require('./User');

const Location = db.define('locations', {
  country: {
    type: Sequelize.STRING(30),
    allowNull: false
  },
  province: {
    type: Sequelize.STRING(30),
    allowNull: false
  },
  city: {
    type: Sequelize.STRING(30),
    allowNull: false
  }
}, {
  timestamps: false
});

Location.hasMany(User);

module.exports = Location;