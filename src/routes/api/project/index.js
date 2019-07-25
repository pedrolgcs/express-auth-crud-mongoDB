const ProjectController = require('../../../app/controllers/ProjectController')
const routes = require('express').Router()

routes.get('/', ProjectController.index)
routes.get('/:id', ProjectController.show)
routes.post('/', ProjectController.store)
routes.put('/:id', ProjectController.update)
routes.delete('/:id', ProjectController.delete)

module.exports = routes 
