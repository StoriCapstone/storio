const Sequelize = require('sequelize');
const db = require('../db');
const User = require('./user');


const Story = db.define('story', {
  //Story belongs to a user
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  url: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  genre: {
    //helpful for filtering in public browse setting
    type: Sequelize.ENUM(  // eslint-disable-line new-cap
      'Crime',
      'Memorial',
      'History',
      'Family',
      'Scary',
      'Funny',
      'Educational',
    ),
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  mediaLength: {
    //helpful for filtering in public browse setting
    type: Sequelize.INTEGER,
  },
  releaseDate: {
    type: Sequelize.DATE, //there may be a more appropriate data type
  },
  thumbnailUrl: {
    type: Sequelize.STRING,
    defaultValue: '/microphone.png',
  },
  upvotes: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
  downvotes: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
  briefDescription: {
    type: Sequelize.TEXT,
  },
  isPublic: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  },
},
  {
    scopes: {
      populated: () => ({
        include: [{ all: true, }, ],
      }),
    },
  });

Story.prototype.getUsersWhoCanView = async function () {
  const storyId = this.id
  const sql = `
  SELECT
  "public".users.id
  FROM
  "public"."UserGroup"
  JOIN "public".users
  ON "public"."UserGroup"."userId" = "public".users."id"
  JOIN "public"."StoryGroup"
  ON "public"."StoryGroup"."groupId" = "public"."UserGroup"."groupId"
  WHERE
  "public"."StoryGroup"."storyId" = ${storyId}
  UNION
  SELECT
  "public".users.id
  FROM
  "public".users
  JOIN "public".stories
  ON "public".users."id" = "public".stories."userId"
  WHERE
  "public"."stories"."id" = ${storyId}
  order by id
  `
  const result = await db.query(sql)
  // the result isn't true User model instances. Lets get the real ones so we can use built in methods!
  const userList = await Promise.all(result[0].map(user => User.findById(user.id)))
  return userList
};
module.exports = Story;
