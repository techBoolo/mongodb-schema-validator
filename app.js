import express from 'express'
import { getDB } from './config/db.js'

const app = express()

app.use(async (req, res) => {
  const Post = getDB().collection('authors')
  const cursor = Post.find()
  const result = await cursor.toArray()
  res.status(200).json(result)
})
export default app
