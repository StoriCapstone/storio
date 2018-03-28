const router = require('express').Router();
const { Story, Comment, User, Media, StoryUserVotes, } = require('../db/models');
module.exports = router;

router.get('/:id', (req, res, next) => {
  Story.findById(req.params.id, {
    include: [
      { model: User, },
      { model: Media, },
      { model: Comment, include: [{ model: User, }, ], },
    ],
  })
    .then(story => res.json(story))
    .catch(next);
});

const processVote = (req, newVote) =>{
console.log('req: ', req.user.id);
  return StoryUserVotes.findOrCreate({
    where: { voter_user_id: req.user.id, voter_story_id: req.params.id, },
    defaults: { vote: 1, },
  }).then(
    ([dbVote, ]) =>
      (dbVote.vote !== newVote
        ? dbVote.update({
            vote: newVote,
          })
        : dbVote)
  );
}
router.post('/:id/vote-up', (req, res, next) => {
  //update a Story
  if (!req.user) {

    res.sendStatus(403); //forbidden
    return undefined;
  } else {
    processVote(req, 1)
      .then(vote => res.send(vote))
      .catch(next);
  }
});

router.post('/:id/vote-down', (req, res, next) => {
  //update a Story
  if (!req.user) {
    res.sendStatus(403); //forbidden
    return undefined;
  } else {
    processVote(req, -1)
      .then(vote => res.send(vote))
      .catch(next);
  }
});

router.post('/:id', (req, res, next) => {
  Comment.create(req.body)
    .then(newComment => {
      res.json(newComment);
    })
    .catch(next);
});
