const db = require('../config/db');
const Sequelize = require('sequelize');

const User = db.define('users', {
  displayname: {
    type: Sequelize.STRING(50),
    allowNull: false
  }
}, {
  timestamps: false
});

module.exports = User;