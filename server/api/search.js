const router = require('express').Router()
const { Products } = require('../db/models')
module.exports = router

router.post('/', (req, res, next) => {
    // console.log('working', req.body)
    let nameParts = req.body.searchCriteria.split(' ')
    nameParts.forEach(word => {
        console.log('line 11', word);
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
