import { Agent } from './agent'

describe('Agent aggregate root', () => {
  it('should be able to create new agent', () => {
    const agentResult = Agent.create({
      name: 'John Doe',
      email: 'valid@email.com',
      is_admin: false,
      password: {
        value: '123456',
        hashed: false
      }
    })

    expect(agentResult.isRight()).toBeTruthy()
  })
})
