import Socket from './socket.js'

const RegisterPage = {
  hidden() {
    document.getElementById('register-page').classList.add('hidden')
  }
}

const RegisterForm = {
  nickname: document.getElementById('nickname'),

  getFields() {
    return {
      nickname: RegisterForm.nickname.value
    }
  },

  validateFields() {
    const { nickname } = RegisterForm.getFields()

    if (nickname.trim() === "") {
      throw new Error('Please, fill out all fields')
    }

    if (nickname.trim().length < 3) {
      throw new Error('Type a bigger name')
    }
  },

  submit(event) {
    event.preventDefault()

    try {
      RegisterForm.validateFields()

      Socket.init()
      Socket.join({ nickname: RegisterForm.getFields().nickname })
      App.createSocketListeners()

      RegisterPage.hidden()
    } catch (error) {
      alert(error.message)
    }
  }
}

const ChatForm = {
  message: document.getElementById('message'),

  getFields() {
    return {
      message: ChatForm.message.value
    }
  },

  validateFields() {
    const { message } = ChatForm.getFields()

    if (message.trim() === "") {
      throw new Error('Please, send a message with content')
    }

    if (message.trim().length < 3) {
      throw new Error('Type a bigger message')
    }
  },

  clearFields() {
    ChatForm.message.value = ""
  },

  submit(event) {
    event.preventDefault()

    try {
      ChatForm.validateFields()

      Socket.createMessage({
        content: ChatForm.getFields().message
      })

      ChatMessages.addMessage({
        nickname: 'You',
        content: ChatForm.getFields().message,
        relation: 'sent'
      })

      ChatForm.clearFields()
    } catch (error) {
      alert(error.message)
    }
  }
}

const ChatMessages = {
  DOMElement: document.getElementsByClassName('chat-messages')[0],

  scrollToEnd() {
    const chatMessages = document.getElementsByClassName('chat-messages')[0]

    chatMessages.scrollTop = chatMessages.scrollHeight
  },

  addMessage({ nickname, content, relation }) {
    const chatMessagesItem = document.createElement('div')
    chatMessagesItem.classList.add('chat-messages-item', relation)

    const html = `
      <div class="user">
        <b>${nickname}</b>
      </div>
      <div>${content}<div>
    `

    chatMessagesItem.innerHTML = html

    ChatMessages.DOMElement.append(chatMessagesItem)
    ChatMessages.scrollToEnd()
  },

  addLog({ content, relation }) {
    const chatMessagesLog = document.createElement('div')
    chatMessagesLog.classList.add('chat-messages-log')

    const logMessages = {
      join: 'join the chat',
      left: 'left the chat'
    }

    chatMessagesLog.innerHTML = `${content} ${logMessages[relation]}`

    ChatMessages.DOMElement.append(chatMessagesLog)
    ChatMessages.scrollToEnd()
  }
}

const App = {
  state: {
    users: []
  },

  init() {
    App.createSubmitListeners()
  },

  createSubmitListeners() {
    const registerForm = document.getElementsByClassName('register-form')[0]
    const chatForm = document.getElementsByClassName('chat-form')[0]

    registerForm.addEventListener('submit', RegisterForm.submit)
    chatForm.addEventListener('submit', ChatForm.submit)
  },

  createSocketListeners() {
    Socket.onJoin(ChatMessages.addLog)
    Socket.onLeft(ChatMessages.addLog)
    Socket.onNewMessage(ChatMessages.addMessage)
  }
}

App.init()
