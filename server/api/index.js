const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.use('/story', require('./story'))
router.use('/stories', require('./stories'))
router.use('/groups', require('./groups'))
router.use('/media', require('./media'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
