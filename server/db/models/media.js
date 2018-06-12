const Sequelize = require('sequelize')
const db = require('../db')

const Media = db.define('media', {  //media belongs to a story, will have story id via association
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  start: {
    type: Sequelize.FLOAT,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  duration: {
    type: Sequelize.FLOAT,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  mediaType: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  caption: {
    type: Sequelize.TEXT,
  },
  key: {
    type: Sequelize.STRING,
  },
})

module.exports = Media
