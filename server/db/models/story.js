const Sequelize = require('sequelize')
const db = require('../db')

const Story = db.define('story', {  //Story belongs to a story, will have story id via association
  name: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true
    }
  },
  url: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true
    }
  },
  genre: { //helpful for filtering in public browse setting
    type: Sequelize.STRING,
    validate: {
      notEmpty: true
    }
  },
  approxLength: {  //helpful for filtering in public browse setting
    type: Sequelize.INTEGER
  },
  releaseDate: {
    type: Sequelize.STRING //there may be a more appropriate data type
  } //for stories which are available in the future
})

module.exports = Story
