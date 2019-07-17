module.exports = {
  async index(req, res) {
    return res.status(200).json({ message: 'OK', user: req.userId })
  }
}
