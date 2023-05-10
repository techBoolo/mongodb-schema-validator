import express from 'express'
import bcrypt from 'bcrypt'
import { getDB } from '../config/db.js'

const router = express.Router()

router.route('/')
  .get(async (req, res) => {
    const Author = getDB().collection('authors')
    const cursor = Author.find()
    const result = await cursor.toArray()
    res.status(200).json(result)
  })
  .post(async (req, res) => {
    const Author = getDB().collection('authors')
    const { name, email, password } = req.body
    const hashedPassword = await bcrypt.hash(password, 10)
    const newPost =  { name, email, password: hashedPassword, admin: false , date: new Date()}
    const result = await Author.insertOne(newPost)
    res.status(201).json({ ...result, message: 'author created' })
  })

export default router
