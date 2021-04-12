import express from 'express'
import http from 'http'
import createSocketServer from './socket-server.js'

const PORT = 3000

const app = express()
const httpServer = http.createServer(app)
createSocketServer(httpServer)

app.use(express.static('public'))

httpServer.listen(PORT, () => console.log(`Aplication listening in port ${PORT}`))
