import express from 'express'
import { ObjectId } from 'mongodb'
import { getDB } from '../config/db.js'

const router = express.Router()

router.route('/')
  .post(async (req, res) => {
    // this author_id will be extracted from authentication
    const author_id = new ObjectId("645b4556cc0b3ed8be405c1d") 
    const Post = getDB().collection('posts')
    const { title, content } = req.body

    const newPost = { 
      title, 
      content, 
      author_id, 
      date: new Date()
    }
    const response = await Post.insertOne(newPost) 
    res.status(201).json({ ...response, message: 'post created' })
  })

router.route('/:id/comments')
  .post(async (req, res) => {
    // get author_id from authentication
    const author_id = new ObjectId("644cf87aa84043f07f35e04a")  
    const { id } = req.params
    const Comment = getDB().collection('comments')
    const { content } = req.body
    const newComment = { 
      content, 
      author_id, 
      post_id: new ObjectId(id),
      date: new Date()
    }

    const response = await Comment.insertOne(newComment)
    res.status(201).json({ ...response, message: 'comment created'})
  })

export default router
