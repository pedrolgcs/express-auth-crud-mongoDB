const routes = require('express').Router()
const AuthController = require('../../../app/controllers/AuthController')

routes.post('/register', AuthController.store)
routes.post('/authenticate', AuthController.login)
routes.post('/forgot_password', AuthController.forgot_password)
routes.post('/reset_password', AuthController.reset_password)

module.exports = routes