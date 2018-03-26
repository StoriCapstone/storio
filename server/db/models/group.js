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
    },
    thumbnailUrl: {
        type: Sequelize.STRING,
        defaultValue: '/groups.png',
    },
    briefDescription: {
        type: Sequelize.TEXT,
    },
    isPublic: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
},
    {
        scopes: {
            populated: () => ({
                include: [{ all: true, }, ],
            }),
        },
    });

module.exports = Group;
