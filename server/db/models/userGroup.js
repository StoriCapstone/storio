const Sequelize = require('sequelize');
const db = require('../db');

const UserGroup = db.define(
  'UserGroups',
  {
    isAdmin: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
  },
);

module.exports = UserGroup;
