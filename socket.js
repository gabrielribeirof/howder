const socketIO = require('socket.io')

function createSocketServer(httpServer) {
  const socketServer = socketIO(httpServer)

  const users = []

  function getUserByID(id) {
    return users.find(user => user.id === id)
  }

  socketServer.of('/chat').on('connection', socket => {
    socket.on('join', data => {
      users.push({
        id: socket.id,
        nickname: data.nickname
      })

      socket.broadcast.emit('log:join', {
        nickname: data.nickname
      })

      console.log(`[JOIN] -> ID: ${socket.id} / Nickname: ${data.nickname}`)
    })

    socket.on('message:create', data => {
      const user = getUserByID(socket.id)

      socket.broadcast.emit('message:new', {
        nickname: user.nickname,
        content: data.content
      })

      console.log(`[MESSAGE]: ${user.nickname} say ${data.content}`)
    })

    socket.on('disconnect', () => {
      const user = getUserByID(socket.id)
      if (!user) return
  
      socket.broadcast.emit('log:left', {
        nickname: user.nickname
      })

      console.log(`[LEFT] -> ID: ${socket.id} / Nickname: ${user.nickname}`)
    })
  })
}

module.exports = createSocketServer
