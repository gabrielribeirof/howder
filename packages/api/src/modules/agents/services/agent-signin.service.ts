import { injectable, inject } from 'tsyringe'
import { AppError } from '@shared/core/errors/app-error'
import { Either, right, left } from '@shared/core/logic/either'

import { IAgentsRepository } from '../repositories/iagents.repository'
import { ITokenProvider } from '@shared/providers/token/itoken-provider'

import { InvalidParameterError } from '@shared/errors/invalid-parameter.error'
import { UnknownAgentError } from '@shared/errors/unknown-agent.error'

import { Agent } from '../domain/agent/agent'

type AgentSignInRequest = {
  email: string
  password: string
}

type AgentSignInResponse = {
  agent: Agent
  token: string
}

@injectable()
export class AgentSignInService {
  constructor(
    @inject('AgentsRepository')
    private agentsRepository: IAgentsRepository,
    @inject('TokenProvider')
    private tokenProvider: ITokenProvider
  ) {}

  public async execute({
    email,
    password
  }: AgentSignInRequest): Promise<Either<AppError, AgentSignInResponse>> {
    const agent = await this.agentsRepository.findByEmail(email)

    if (!agent) {
      return left(new UnknownAgentError())
    }

    const isPasswordCorrect = await agent.password.comparePassword(password)

    if (!isPasswordCorrect) {
      return left(new InvalidParameterError())
    }

    const token = this.tokenProvider.signAgentToken(agent)

    return right({
      agent,
      token
    })
  }
}
