const express = require('express')
const http = require('http')
const createSocketServer = require('./socket')

const PORT = 3000

const app = express()
const httpServer = http.createServer(app)
createSocketServer(httpServer)

app.use(express.static(`${__dirname}/public`))

httpServer.listen(PORT, () => console.log(`Aplication listening in port ${PORT}`))
