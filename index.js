const express = require('express')
require('express-async-errors')
const app = express()

const middleware = require('./util/middleware')
const logger = require('./util/logger')
const { PORT } = require('./util/config')
const { connectToDatabase } = require('./util/db')
const blogsRouter = require('./controllers/blogs')

app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/blogs', blogsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

const start = async () => {
  await connectToDatabase()
  app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`)
  })
}

start()

