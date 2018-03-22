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
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  duration: {
    type: Sequelize.INTEGER,
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
})

module.exports = Media
