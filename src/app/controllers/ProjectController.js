const User = require('../models/User')
const Project = require('../models/Project')
const Task = require('../models/Task')

module.exports = {
  async index(req, res) {
    try {
      const projects = await Project.find().populate(['user', 'tasks'])
      return res.json(projects)
    } catch (error) {
      return res.status(400).json({ error: error })
    }
  },
  async show(req, res) {
    try {
      const project = await Project.findById(req.params.id).populate(['user', 'tasks'])
      if (!project) return res.status(404).json({ error: 'Project not found'})
      return res.json(project)
    } catch (error) {
      return res.status(400).json({ error: error })
    }
  },
  async store(req, res) {
    try {
      const { title, description, tasks } = req.body
      const project = await Project.create({ title, description, user: req.userId })
      
      await Promise.all(tasks.map(async task => {
        const projectTask = new Task({ ...task, project: project.id})
        await projectTask.save()
        project.tasks.push(projectTask)
      }))
      
      await project.save()

      return res.json({ project })
    } catch (error) {
      console.log(error)
      return res.status(400).json({ error: error })
    }
  },
  async update(req, res) {
    try {
      const { title, description, tasks } = req.body
      const project = await Project.findByIdAndUpdate(req.params.id, { 
        title, 
        description, 
      }, { new: true })
      
      project.tasks = []
      await Task.remove({ project: project._id })

      await Promise.all(tasks.map(async task => {
        const projectTask = new Task({ ...task, project: project.id})
        await projectTask.save()
        project.tasks.push(projectTask)
      }))
      
      await project.save()

      return res.json({ project })
    } catch (error) {
      console.log(error)
      return res.status(400).json({ error: error })
    }
  },
  async delete(req, res) {
    try {
      if (!await Project.findByIdAndRemove(req.params.id)) {
        return res.status(404).json({ error: 'Project not found' })
      }
      await Task.remove({ project: req.params.id })
      return res.send()
    } catch (error) {
      return res.status(400).json({ error: error })
    }
  }
}
