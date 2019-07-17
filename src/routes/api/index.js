const apiRouter = require('express').Router()

apiRouter.use('/', require('./project'))
apiRouter.use('/auth', require('./auth'))

module.exports = apiRouter