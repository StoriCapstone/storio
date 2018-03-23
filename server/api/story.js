const router = require('express').Router()
const {Story, Comment, } = require('../db/models')
module.exports = router

router.get('/:id', (req, res, next) => {
  Story.findAll({where: {id: req.params.id, }, include: [{all: true, }, ], })
    .then(story => res.json(story))
    .catch(next)
})

router.post('/:id', (req, res, next) => {
  Comment.create(req.body)
  .then( newComment => res.json(newComment))
  .catch(next)
})
