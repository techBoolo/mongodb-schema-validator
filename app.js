import express from 'express'
import authorRoute from './routes/author.js'

const app = express()
app.use(express.json())

app.use('/authors', authorRoute)

export default app
