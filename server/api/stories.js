
const router = require('express').Router()
const { Story, } = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {   //get all Stories
  Story.scope('populated').findAll()
    .then((result) => res.json(result))
    .catch(next)
})

router.get('/:id', (req, res, next) => {   //get a single Story
  Story.scope('populated').findById(req.params.id)
    .then(result => res.json(result))
    .catch(next)
})

router.post('/', (req, res, next) => {   //create a Story
  Story.create(req.body)
    .then(newStoryInstance => newStoryInstance.setUser(req.user))
    .then(associatedStory => res.json(associatedStory))
    .catch(next)
})

router.put('/:id', (req, res, next) => {   //update a Story
  Story.update(req.body, {
    where: {
      id: req.params.id,
    },
    returning: true,
  })
    .then(_ => Story.scope('populated').findById(req.params.id)) ///and return the updated Story
    .then(reloadedStory => res.json(reloadedStory))
    .catch(next)
})

router.delete('/:id', (req, res, next) => {   //delete a Story
  Story.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then(deleted => {
      res.status(204).json(deleted)
    })
    .catch(next)
})
