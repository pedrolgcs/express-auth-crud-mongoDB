const apiRouter = require('express').Router()
const authMiddlewares = require('../../app/middlewares/auth')

apiRouter.use('/', authMiddlewares, require('./project'))
apiRouter.use('/auth', require('./auth'))

module.exports = apiRouter