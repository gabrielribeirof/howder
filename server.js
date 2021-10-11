import express from 'express'
import http from 'http'
import ip from 'ip'
import createSocketServer from './socket-server.js'

const PORT = 3000

const app = express()
const httpServer = http.createServer(app)
createSocketServer(httpServer)

app.use(express.static('public'))

httpServer.listen(PORT, () => console.log(`Aplication running in http://${ip.address()}:${PORT}`))
