const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const mailer = require('../../modules/mail')

function generateToken(params = {}) {
  return jwt.sign(params, process.env.JWT_SECRET, {
    expiresIn: 86400
  })
}

module.exports = {
  async store(req, res) {
    const { name, email, password } = req.body
    try {
      const user = await User.create({
        name, email, password
      })

      user.password = undefined

      return res.status(201).json({
        user,
        token: generateToken({ id: user.id })
      })
    } catch (error) {
      return res.status(400).json(`error: ${error}`)
    }
  },
  async login(req, res) {
    try {
      const { email, password } = req.body
      const user = await User.findOne({ email }).select('+password')

      // validations
      if (!user) {
        return res.status(400).json({ error: 'User not found'})
      }
      if (!await bcrypt.compare(password, user.password)) {
        return res.status(400).json({ error: 'Invalid password'})
      }

      user.password = undefined

      res.status(200).json({
        user,
        token: generateToken({ id: user.id })
      })

    } catch (error) {
      return res.json(error)
    }
  },
  async forgot_password(req, res) {
    const { email } = req.body
    try {
      const user = await User.findOne({ email })

      if (!user) {
        return res.status(400).json({ error: 'User not found'})
      }

      const token = crypto.randomBytes(20).toString('hex')
      const now = new Date()
      now.setHours(now.getHours() + 1)

      await User.findByIdAndUpdate(user.id, {
        '$set': {
          passwordResetToken: token,
          passwordResetExpires: now
        }
      })

      mailer.sendMail({
        from: 'pedro.lg.cs@gmail.com',
        to: email,
        template: 'forgot_password',
        context: { token }
      }, (err) => {
        if (err) {
          return res.status(400).json({ error: err })
        }
        return res.status(200).send()
      })

    } catch (error) {
      console.log(error)
      return res.status(400).json(error)
    }
  },
  async reset_password(req, res) {
    const { email, token, password } = req.body
    try {
      const user = await User.findOne({ email})
        .select('+passwordResetToken +passwordResetExpires')
      
      if (!user) {
        return res.status(400).json({ error: 'User not found'})
      }
    
      if (token !== user.passwordResetToken) {
        return res.status(400).json({ error: 'Token invalid' })
      }

      const now = new Date()

      if (now > user.passwordResetExpires) {
        return res.status(400).json({ error: 'Token expired, generate a new one' })
      }

      user.password = password
      await user.save()

      return res.status(200).send('ok')

    } catch (error) {
      res.status(400).json(error)
    }
  }
}
