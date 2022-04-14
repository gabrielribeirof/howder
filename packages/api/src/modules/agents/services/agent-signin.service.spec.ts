import { AgentSignInService } from './agent-signin.service'
import { AgentSignUpService } from './agent-signup.service'

import { InMemoryAgentsRespository } from '../repositories/in-memory/in-memory-agents.repository'
import { TokenProvider } from '@shared/providers/token/implementations/token-provider'

import { InvalidParameterError } from '@shared/errors/invalid-parameter.error'
import { UnknownAgentError } from '@shared/errors/unknown-agent.error'

let agentsRepository: InMemoryAgentsRespository
let tokenProvider: TokenProvider
let agentSignUpService: AgentSignUpService

let sut: AgentSignInService

describe('AgentSignInService', () => {
  beforeEach(() => {
    tokenProvider = new TokenProvider()
    agentsRepository = new InMemoryAgentsRespository()

    agentSignUpService = new AgentSignUpService(agentsRepository, tokenProvider)
    sut = new AgentSignInService(agentsRepository, tokenProvider)
  })

  it('should signin an agent', async () => {
    await agentSignUpService.execute({
      name: 'Agent Name',
      email: 'validemail@example.com',
      password: '123456'
    })

    const response = await sut.execute({
      email: 'validemail@example.com',
      password: '123456'
    })

    expect(response.isRight()).toBeTruthy()
    expect(response.value).toHaveProperty('agent')
    expect(response.value).toHaveProperty('token')
  })

  it('should not signin an agent with wrong email', async () => {
    await agentSignUpService.execute({
      name: 'Agent Name',
      email: 'validemail@example.com',
      password: '123456'
    })

    const response = await sut.execute({
      email: 'invalid@example.com',
      password: '123456'
    })

    expect(response.isRight()).toBeFalsy()
    expect(response.value).toBeInstanceOf(UnknownAgentError)
  })

  it('should not signin an agent with wrong password', async () => {
    await agentSignUpService.execute({
      name: 'Agent Name',
      email: 'validemail@example.com',
      password: '123456'
    })

    const response = await sut.execute({
      email: 'validemail@example.com',
      password: '1234'
    })

    expect(response.isRight()).toBeFalsy()
    expect(response.value).toBeInstanceOf(InvalidParameterError)
  })
})
