import { Agent } from './agent'

describe('Agent aggregate root', () => {
  it('should be able to create new agent', async () => {
    const agentOrError = Agent.create({
      name: 'John Doe',
      email: 'valid@email.com',
      admin: false,
      password: '123456'
    })

    expect(agentOrError.isRight()).toBeTruthy()
  })
})
