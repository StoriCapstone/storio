
const router = require('express').Router()
import {Group} from '../db/models'
module.exports = router

router.get('/', (req, res, next) => {
 Group.scope('populated').findAll()
    .then((result) => res.json(result))
    .catch(next)
})

router.get('/:id', (req, res, next) => {
 Group.scope('populated').findById(req.params.id)
    .then(result => res.json(result))
    .catch(next)
})

router.get('/:id/products', (req, res, next) => {
 Group.scope('populated').findById(req.params.id)
    .then(result => {
      result.getProducts()
      .then((products) => {
        res.json(products)
      })
    })
    .catch(next)
})


router.post('/', (req, res, next) => {
 Group.scope('populated').create(req.body)
    .then((brand) => {
      let promises = []
      if (req.body.product) promises.push(brand.addProduct(req.body.product))
      if (req.body.service) promises.push(brand.addService(req.body.service))
      if (req.body.cause) promises.push(brand.addCause(req.body.cause))
      Promise.all(promises)
      .then(_ => brand.reload())
      .then(reloadedBrand => {
        res.json(reloadedBrand)
      })
    })
    .catch(next)
})

router.put('/:id', (req, res, next) => {
 Group.update(req.body, {
    where: {
      id: req.params.id
    },
    returning: true
  })
.then((brand) => {
    let promises = []
    if (req.body.addProduct) promises.push(brand[1][0].addProduct(req.body.addProduct))
    if (req.body.removeProduct) promises.push(brand[1][0].removeProduct(req.body.removeProduct))
    Promise.all(promises)
      .then(_ =>Group.scope('populated').findById(req.params.id))
      .then(reloadedBrand => {
        res.json(reloadedBrand)
      })
  })
  .catch(next)
  })

router.delete('/:id', (req, res, next) => {
 Group.destroy({
    where: {
      id: req.params.id
    },
  })
  .then(deleted => {
    res.status(204).json(deleted)
  })
  .catch(next)
})
