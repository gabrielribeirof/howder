const SocketClient = {
  instance: undefined,
  socketId: undefined,

  init() {
    if (!SocketClient.instance) {
      SocketClient.instance = io('/chat')
      SocketClient.setSocketId(SocketClient.onConnect)
    } else {
      throw new Error('SocketClient instance already exists')
    }
  },

  getInstance() {
    if (SocketClient.instance) {
      return SocketClient.instance
    } else {
      throw new Error('SocketClient instance doesn\'t exist')
    }
  },

  setSocketId(id) {
    SocketClient.socketId = id
  },

  join({ nickname }) {
    SocketClient.init()
    SocketClient.getInstance().emit('user:create', {
      nickname
    })
  },

  createMessage({ content }) {
    SocketClient.getInstance().emit('message:create', {
      content
    })
  },

  onConnect(listener) {
    SocketClient.getInstance().on('connect', () => listener(SocketClient.getInstance().id))
  },

  onSetup(listener) {
    SocketClient.getInstance().on('setup', data => listener(data))
  },

  onNewMessage(listener) {
    SocketClient.getInstance().on('message:new', data => listener(data))
  },

  onJoin(listener) {
    SocketClient.getInstance().on('user:join', data => listener(data))
  },

  onLeft(listener) {
    SocketClient.getInstance().on('user:left', data => listener(data))
  }
}

export default SocketClient
