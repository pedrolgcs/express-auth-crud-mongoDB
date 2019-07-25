const mongoose = require('../../configs/database')

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  completed: {
    type: Boolean,
    required: true,
    default: false
  }
}, { timestamps: true })


module.exports = mongoose.model('Task', TaskSchema)

