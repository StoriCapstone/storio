const router = require('express').Router()
const searchZones = { User, Group, Story } = require('../db/models') // try with import....functional differences???

module.exports = router
//is there an issue with running the search twice on the same search term?


router.post('/', (req, res, next) => {
    // console.log('working', req.body)l

    let searchTerms = req.body.searchCriteria.split(' ') //place each term in an array
    let searchZones = req.body.
    searchTerms.forEach(word => {
      return
        return Products.scope('populated').findAll({
                where: {
                    name: {
                        $iLike: `%${word}%`
                    },
                    $or: [{a: 5}, {a: 6}]
                }
            })
            .then((result) => {
                console.log(result)
                res.send(result) // return res.json(result)
            })
            .catch(next)
    })
})
