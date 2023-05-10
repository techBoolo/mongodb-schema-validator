import { MongoClient } from 'mongodb'
import dotenv from 'dotenv'
dotenv.config()

const mongodbUrl = process.env.MONGODB_URL
const dbName = process.env.DB_NAME
let db

const mongoClient = new MongoClient(mongodbUrl)

const connectDB = async () => {
  if(db) return
  try {
    process.on('exit', async () => {
      if(mongoClient.topology.isConnected()) {
        console.log('closing the db');
        await mongoClient.close()
      }
    })
    await mongoClient.connect()
    console.log('Connected to db');
    db = mongoClient.db(dbName)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

export const getDB = () => {
  return db
}
export default connectDB
