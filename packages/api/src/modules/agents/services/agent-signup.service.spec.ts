import { AgentSignUpService } from './agent-signup.service'

import { InMemoryAgentsRespository } from '../repositories/in-memory/in-memory-agents.repository'
import { TokenProvider } from '@shared/providers/token/implementations/token-provider'

import { InvalidParameterError } from '@shared/errors/invalid-parameter.error'

let agentsRepository: InMemoryAgentsRespository
let tokenProvider: TokenProvider
let sut: AgentSignUpService

describe('AgentSignUpService', () => {
  beforeEach(() => {
    tokenProvider = new TokenProvider()
    agentsRepository = new InMemoryAgentsRespository()

    sut = new AgentSignUpService(agentsRepository, tokenProvider)
  })

  it('should create an agent', async () => {
    const response = await sut.execute({
      name: 'Agent Name',
      email: 'validemail@example.com',
      password: '123456'
    })

    expect(response.isRight()).toBeTruthy()
    expect(agentsRepository.agents.length).toBe(1)
  })

  it('should not create an agent with invalid data', async () => {
    const response = await sut.execute({
      name: 'A',
      email: 'v',
      password: '123'
    })

    expect(response.value).toBeInstanceOf(InvalidParameterError)
    expect(agentsRepository.agents.length).toBe(0)
  })
})
