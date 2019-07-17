const path = require('path')
const nodemailer = require('nodemailer')
const hbs = require('nodemailer-express-handlebars')

const transport = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD
  }
})

const options = {
  viewEngine: {
    extname: '.hbs',
    layoutsDir: path.resolve('./src/resources/mail/views/email/'),
    defaultLayout : 'template',
    partialsDir : path.resolve('./src/resources/mail/views/partials/')
  },
  viewPath: path.resolve('./src/resources/mail/views/email/'),
  extName: '.hbs'
}

transport.use('compile', hbs(options))

module.exports = transport
