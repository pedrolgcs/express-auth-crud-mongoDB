const authMiddlewares = require('../../../app/middlewares/auth')
const ProjectController = require('../../../app/controllers/ProjectController')
const routes = require('express').Router()

// index API
routes.get('/', authMiddlewares, ProjectController.index)

module.exports = routes