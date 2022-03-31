import { AppError } from '@shared/core/errors/app-error'
import { Either, right, left } from '@shared/core/logic/either'

import { IAgentsRepository } from '../repositories/iagents.repository'
import { ITokenProvider } from '@shared/providers/token/itoken-provider'

import { InvalidParameterError } from '@shared/errors/invalid-parameter.error'

import { Agent } from '../domain/agent/agent'
import { createAgent } from '../domain/agent/factories/agent.factory'

type AgentSignUpRequest = {
  name: string
  email: string
  password: string
}

type AgentSignUpResponse = {
  agent: Agent
  token: string
}

export class AgentSignUpService {
  constructor(
    private agentsRepository: IAgentsRepository,
    private tokenProvider: ITokenProvider
  ) {}

  public async execute({
    name,
    email,
    password
  }: AgentSignUpRequest): Promise<Either<AppError, AgentSignUpResponse>> {
    const agent = createAgent({
      name,
      email,
      password
    })

    if (agent.isLeft()) {
      return left(new InvalidParameterError(agent.value))
    }

    await this.agentsRepository.save(agent.value)

    const token = this.tokenProvider.signAgentToken(agent.value)

    return right({
      agent: agent.value,
      token
    })
  }
}
