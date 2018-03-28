const Sequelize = require('sequelize');
const db = require('../db');

const StoryUserVotes = db.define('StoryUserVotes', {
  vote: {
    type: Sequelize.INTEGER,
    validate: {
      isIn: [[-1, 1, ], ],
    },
    allowNull: false,
  },
});

module.exports = StoryUserVotes;
