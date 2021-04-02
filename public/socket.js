const Socket = {
  instance: undefined,

  init() {
    if (!Socket.instance) {
      Socket.instance = io()
    } else {
      throw new Error('Socket instance already exists')
    }
  },

  getInstance() {
    if (Socket.instance) {
      return Socket.instance
    } else {
      throw new Error('Socket instance doesn\'t exist')
    }
  },

  join({ nickname }) {
    Socket.getInstance().emit('join', {
      nickname
    })
  },

  onNewMessage(listener) {
    Socket.getInstance().on('message:new', data => {
      listener({
        nickname: data.nickname,
        content: data.content,
        relation: 'received'
      })
    })
  },

  onJoin(listener) {
    Socket.getInstance().on('log:join', data => {
      listener({
        content: data.nickname,
        relation: 'join'
      })
    })
  },

  onLeft(listener) {
    Socket.getInstance().on('log:left', data => {
      listener({
        content: data.nickname,
        relation: 'left'
      })
    })
  }
}

export default Socket
