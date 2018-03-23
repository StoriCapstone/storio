const Sequelize = require('sequelize')
const db = require('../db')

const Group = db.define('group', {
    name: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    }
},
    {
        scopes: {
            populated: () => ({
                include: [{ all: true }]
            })
        }
    });

module.exports = Group;
