const App = {
  state: {
    users: {},
    messages: {}
  },

  observers: [],

  subscribe(observerFunction) {
    App.observers.push(observerFunction)
  },

  notifyAll(command) {
    for (const observerFunction of App.observers) {
      observerFunction(command)
    }
  },

  setState(newState) {
    Object.assign(App.state, newState)
  },

  addMessage({ id, user, userId, content }) {
    App.state.messages[id] = {
      id,
      user,
      userId,
      content
    }

    App.notifyAll({
      type: 'message:new',
      id,
      user,
      content
    })
  },

  addUser({ id, nickname }) {
    App.state.users[id] = {
      id,
      nickname
    }

    App.notifyAll({
      type: 'user:join',
      id,
      nickname
    })
  },

  removeUser({ id }) {
    const { nickname } = App.state.users[id]

    delete App.state.users[id]

    App.notifyAll({
      type: 'user:left',
      id,
      nickname
    })
  },

  createMessage({ content }) {
    App.notifyAll({
      type: 'message:create',
      content
    })
  }
}

export default App
