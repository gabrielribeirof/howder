import Socket from './socket.js'

const RegisterPage = {
  hidden() {
    const registerPageElement = document.getElementById('register-page')

    registerPageElement.classList.add('hidden')
  }
}

const RegisterForm = {
  nickname: document.getElementById('nickname'),

  getValues() {
    return {
      nickname: RegisterForm.nickname.value
    }
  },

  submit(event) {
    event.preventDefault()

    Socket.init()
    Socket.join({ nickname: RegisterForm.getValues().nickname })

    App.createSocketListeners()

    RegisterPage.hidden()
  }
}

const ChatForm = {
  message: document.getElementById('message'),

  getValues() {
    return {
      message: ChatForm.message.value
    }
  },

  clearFields() {
    ChatForm.message.value = ""
  },

  submit(event) {
    event.preventDefault()

    Socket.emit('message:create', {
      content: ChatForm.getValues().message
    })

    ChatMessages.addMessage({
      nickname: 'You',
      content: ChatForm.getValues().message,
      relation: 'sent'
    })

    ChatForm.clearFields()
    ChatMessages.scrollToEnd()
  }
}

const ChatMessages = {
  DOMElement: document.getElementsByClassName('chat-messages')[0],

  addMessage({ nickname, content, relation }) {
    const userElement = document.createElement('div')
    const bElement = document.createElement('b')
    bElement.innerHTML = nickname
    userElement.classList.add('user')
    userElement.append(bElement)

    const contentElement = document.createElement('div')
    contentElement.innerHTML = content

    const chatMessagesItem = document.createElement('div')
    chatMessagesItem.classList.add('chat-messages-item', relation)
    chatMessagesItem.append(userElement, contentElement)

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
  },

  scrollToEnd() {
    const chatMessages = document.getElementsByClassName('chat-messages')[0]
    chatMessages.scrollTop = chatMessages.scrollHeight
  }
}

const App = {
  init() {
    ChatMessages.scrollToEnd()

    App.createMainEventListeners()
  },

  createMainEventListeners() {
    const registerForm = document.getElementsByClassName('register-form')[0]
    const chatForm = document.getElementsByClassName('chat-form')[0]

    registerForm.addEventListener('submit', RegisterForm.submit)
    chatForm.addEventListener('submit', ChatForm.submit)
  },

  createSocketListeners() {
    Socket.onNewMessage(ChatMessages.addMessage)
    Socket.onJoin(ChatMessages.addLog)
    Socket.onLeft(ChatMessages.addLog)
  }
}

App.init()
