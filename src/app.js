const express = require('express')
const bodyParser = require('body-parser')

// create aplicantion
const app = express()

// middlewares
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

require('./routes/index') (app)

module.exports = app
