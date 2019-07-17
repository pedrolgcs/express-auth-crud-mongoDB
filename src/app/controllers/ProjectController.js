const User = require('../models/User')

module.exports = {
  async index(req, res) {
    const { id } = req.userId
    const user = await User.findOne(id)
    return res.status(200).json({ message: 'OK', user: user })
  }
}
