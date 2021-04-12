import * as io from 'socket.io'

import App from './public/app.js'

function createSocketServer(httpServer) {
  const socketServer = new io.Server(httpServer)

  App.subscribe(command => {
    console.log(`[${String(command.type).toUpperCase()}]: ${JSON.stringify(command)}`)
    socketServer.of('/chat').emit(command.type, command)
  })

  socketServer.of('/chat').on('connection', socket => {
    const userId = socket.id

    socket.on('user:create', data => {
      App.addUser({
        id: userId,
        nickname: data.nickname
      })

      socket.emit('setup', App.state)
    })

    socket.on('message:create', data => {
      const user = App.state.users[userId]
      const messageId = Math.floor(Math.random() * 10000000)

      App.addMessage({
        id: messageId,
        user,
        userId,
        content: data.content
      })
    })

    socket.on('disconnect', () => {
      const user = App.state.users[userId]
      if (!user) return

      App.removeUser({ id: userId })
    })
  })
}

export default createSocketServer
