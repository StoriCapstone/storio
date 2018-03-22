const router = require('express').Router()
const {Story, } = require('../db/models')
module.exports = router

router.get('/:id', (req, res, next) => {
  Story.findById(req.params.id)
    .then(story => res.json(story))
    .catch(next)
})
