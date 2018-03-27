const router = require('express').Router()
const {Story, Comment, User, Media, } = require('../db/models')
module.exports = router

router.get('/:id', (req, res, next) => {
  Story.findById(req.params.id, {include: [{model: User, }, {model: Media}, {model: Comment, include: [{model: User, }, ], }, ], })
    .then(story => res.json(story))
    .catch(next)
})

router.post('/:id', (req, res, next) => {
  Comment.create(req.body)
  .then( newComment => {
    res.json(newComment)
  })
  .catch(next)
})
