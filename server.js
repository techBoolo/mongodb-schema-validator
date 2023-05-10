import http from 'http'
import app from './app.js'

const server = http.createServer()

const PORT = process.env.PORT || 3001

server.on('request', app)

server.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
})
