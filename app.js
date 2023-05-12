import express from 'express'
import 'express-async-errors'
import authorRoute from './routes/author.js'
import postRoute from './routes/post.js'
import commentRoute from './routes/comment.js'

const app = express()
app.use(express.json())

app.use('/authors', authorRoute)
app.use('/posts', postRoute)
app.use('/comments', commentRoute)


app.use((req, res, next) => {
  const error = new Error('route not found', 404)
  next(error)
})

app.use((error, req, res, next) => {
  res.status(error.statusCode || 500)
  console.dir(error, { depth: null });
  res.json({ message: error.message })
})

export default app
