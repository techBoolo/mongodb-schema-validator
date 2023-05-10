import express from 'express'
import { getDB } from '../config/db.js'

const router = express.Router()

router.route('/')
  .get(async (req, res) => {
    const Post = getDB().collection('authors')
    const cursor = Post.find()
    const result = await cursor.toArray()
    res.status(200).json(result)
  })
  .post(async (req, res) => {
    try {
      const Post = getDB().collection('authors')
      const { name, email, password } = req.body
      const newPost =  { name, email, password }
      const result = await Post.insertOne(newPost)
      res.status(201).json({ ...result, message: 'author created' })
    } catch (error) {
      res.status(400).json({ error: { message: error.message}})
    }
  })

export default router
