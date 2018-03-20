const Sequelize = require('sequelize')
const db = require('../db')

const Story = db.define('story', {  //Story belongs to a user
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  url: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  genre: { //helpful for filtering in public browse setting
    type: Sequelize.ENUM('Crime', 'Memorial','History','Family', 'Scary','Funny','Educational'),
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  mediaLength: {  //helpful for filtering in public browse setting
    type: Sequelize.INTEGER
  },
  releaseDate: {
    type: Sequelize.DATE //there may be a more appropriate data type
  } //for stories which are available in the future
})

module.exports = Story
