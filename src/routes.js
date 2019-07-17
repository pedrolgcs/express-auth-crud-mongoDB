const authMiddlewares = require('./app/middlewares/auth')
const AuthController = require('./app/controllers/AuthController')
const ProjectController = require('./app/controllers/ProjectController')

const routes = require('express').Router()

// index API
routes.get('/', authMiddlewares, ProjectController.index)

// register
routes.route('/auth/register')
  .post(AuthController.store)

/**
 * Auth
 */
routes.post('/authenticate', AuthController.login)
routes.post('/forgot_password', AuthController.forgot_password)
routes.post('/reset_password', AuthController.reset_password)

module.exports = routes
