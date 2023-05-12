import express from 'express'
import { getDB } from '../config/db.js'
import { ObjectId } from 'mongodb'

const router = express.Router()

router.route('/:id')
  .patch(async (req, res) => {
    const Comment = getDB().collection('comments')
    // get the author_id from authentication, to authorize but we do not need
    // for now, since we are just doing collection vaidation
    const { id } = req.params
    const { content } = req.body

    const updateInfo = { content }
    const response = await Comment.updateOne(
      { _id: new ObjectId(id)}, 
      { $set: updateInfo, 
        $currentDate: { updatedAt: true } 
      })
    res.status(200).json({ ...response, message: 'comment updated' })
  })

export default router
