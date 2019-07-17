const mongoose = require('mongoose')

mongoose.connect(`mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/node_rest`,
  { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false }
)

module.exports = mongoose
