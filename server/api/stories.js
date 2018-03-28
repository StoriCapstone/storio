const router = require('express').Router();
const { Story, StoryUserVotes, } = require('../db/models');
const db = require('../db');
const Op = require('sequelize').Op;
module.exports = router;

router.get('/', (req, res, next) => {
  //get all Stories
  Story.scope('populated')
    .findAll()
    .then(result => res.json(result))
    .catch(next);
});

router.get('/trending', async (req, res, next) => {
  //get the top 10!
  const sql = `
  SELECT
  COALESCE(Sum(vote), 0) as Rating,
  "public".stories.*,
  "public".users."firstName" as "authorFirstName",
  "public".users."lastName" as "authorLastName"
  FROM
  "public".stories
  JOIN "public".users
  ON "public".stories."userId" = "public".users."id"
  left JOIN "public"."StoryUserVotes"
  ON "public".stories."id" = "public"."StoryUserVotes"."storyId"
  GROUP BY
  "public".stories."id","public".users."id"
  order by rating DESC
  limit 10
  `;
  try {
    const [results, ] = await db.query(sql, db.QueryTypes.SELECT);
    const loggedInVotes = req.user
      ? await StoryUserVotes.findAll({
          where: {
            userId: req.user.id,
            storyId: {
              [Op.in]: results.map(story => story.id),
            },
          },
        })
      : null;
    const votes = {};
    if (loggedInVotes) {
      for (let storyVote of loggedInVotes) {
        votes[storyVote.storyId] = storyVote.vote;
      }
    }
    for (let result of results) {
      result.userVote = votes[result.id] ? votes[result.id] : 0;
    }
    res.json(results);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', (req, res, next) => {
  //get a single Story
  Story.scope('populated')
    .findById(req.params.id)
    .then(result => res.json(result))
    .catch(next);
});

router.post('/', (req, res, next) => {
  //create a Story
  Story.create(req.body)
    .then(newStoryInstance => newStoryInstance.setUser(req.user))
    .then(associatedStory => res.json(associatedStory))
    .catch(next);
});

router.put('/:id', (req, res, next) => {
  //update a Story
  Story.update(req.body, {
    where: {
      id: req.params.id,
    },
    returning: true,
  })
    .then(_ => Story.scope('populated').findById(req.params.id)) ///and return the updated Story
    .then(reloadedStory => res.json(reloadedStory))
    .catch(next);
});

router.delete('/:id', (req, res, next) => {
  //delete a Story
  Story.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then(deleted => {
      res.status(204).json(deleted);
    })
    .catch(next);
});
