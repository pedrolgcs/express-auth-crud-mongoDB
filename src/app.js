const express = require('express')
const bodyParser = require('body-parser')

// create aplicantion
const app = express()

// middlewares
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// routes
// app.use('/api', require('./routes'))
require('./routes/index') (app)

module.exports = app
