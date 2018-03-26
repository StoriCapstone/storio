const router = require('express').Router()
const { Media, } = require('../db/models')
module.exports = router

router.post('/:storyId', (req, res, next) => {
    // console.log(req.body)
  const arrOfMedia = req.body.map( mediaObj => ({...mediaObj, storyId: req.params.storyId, }) )
  Media.bulkCreate(arrOfMedia)
  .then( () => {
    Media.findAll({where: {storyId: req.params.storyId, }, include: [{all: true, nested: true, }, ], }).then(
        mediaInstanceArray => res.json(mediaInstanceArray)
    )
  })
  .catch(next)
})
