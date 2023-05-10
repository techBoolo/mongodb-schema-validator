import express from 'express'
import 'express-async-errors'
import authorRoute from './routes/author.js'

const app = express()
app.use(express.json())

app.use('/authors', authorRoute)


app.use((req, res, next) => {
  const error = new Error('route not found', 404)
  next(error)
})

app.use((error, req, res, next) => {
  res.status(error.statusCode || 500)
  res.json({ message: error.message })
})

export default app
