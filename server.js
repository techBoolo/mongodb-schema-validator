import http from 'http'

const server = http.createServer()

const PORT = process.env.PORT || 3001

server.on('request', (req, res) => {
  res.setHeader('content-type', 'text/plain')
  res.end('it works')
})

server.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
})
