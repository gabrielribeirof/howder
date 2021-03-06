import App from './app.js'
import SocketClient from './socket-client.js'

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
    const { nickname } = RegisterForm.getFields()
    event.preventDefault()

    try {
      RegisterForm.validateFields()

      SocketClient.join({ nickname })
      SocketClient.getInstance().on('setup', RegisterPage.hidden())
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
  },

  clearFields() {
    ChatForm.message.value = ""
  },

  submit(event) {
    const { message } = ChatForm.getFields()
    event.preventDefault()

    try {
      ChatForm.validateFields()

      SocketClient.createMessage({
        content: message
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

  addMessage({ user, content }) {
    const chatMessagesItem = document.createElement('div')
    chatMessagesItem.classList.add('chat-messages-item', user.id === SocketClient.socketId ? 'sent' : 'received')

    const html = `
      <div class="user">
        <b>${user.nickname}</b>
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

App.subscribe(command => {
  const acceptedCommandsType = {
    "user:join": () => {
      ChatMessages.addLog({
        content: command.nickname,
        relation: 'join'
      })
    },
    "user:left": () => {
      ChatMessages.addLog({
        content: command.nickname,
        relation: 'left'
      })
    },
    "message:new": () => {
      ChatMessages.addMessage({
        user: command.user,
        content: command.content
      })
    }
  }

  const commandFunction = acceptedCommandsType[command.type]

  commandFunction && commandFunction()
})

const registerForm = document.getElementsByClassName('register-form')[0]
const chatForm = document.getElementsByClassName('chat-form')[0]

registerForm.addEventListener('submit', RegisterForm.submit)
chatForm.addEventListener('submit', ChatForm.submit)
