const express = require('express')
const http = require('http')
const { createSocketEnvironment } = require('./socket')

const PORT = 3000

const app = express()
const server = http.createServer(app)
createSocketEnvironment(server)

app.use(express.static(`${__dirname}/public`))

server.listen(PORT, () => console.log(`Aplication listening in port ${PORT}`))
