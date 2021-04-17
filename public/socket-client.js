import App from './app.js'

const SocketClient = {
  instance: undefined,
  socketId: undefined,

  init() {
    if (!SocketClient.instance) {
      SocketClient.instance = io('/chat')
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
    SocketClient.getInstance().emit('user:create', { nickname })
    SocketClient.createSocketListeners()
  },

  createMessage({ content }) {
    SocketClient.getInstance().emit('message:create', {
      content
    })
  },

  createSocketListeners() {
    SocketClient.instance.on('connect', () => SocketClient.setSocketId(SocketClient.instance.id))

    SocketClient.instance.on('setup', data => App.setState(data))

    SocketClient.instance.on('user:join', data => {
      App.addUser({
        id: data.id,
        nickname: data.nickname
      })
    })

    SocketClient.instance.on('user:left', data => App.removeUser({ id: data.id }))

    SocketClient.instance.on('message:new', data => {
      const { id, user, content } = data

      App.addMessage({ id, user, content })
    })
  }
}

export default SocketClient
