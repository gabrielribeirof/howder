import { container } from 'tsyringe'
import { Request, Response } from 'express'
import { AgentMapper } from '@modules/agents/mappers/agent.mapper'
import { ok, fail } from '@shared/utils/http-response.utils'

import { AgentSignUpService } from '@modules/agents/services/agent-signup.service'
import { AgentSignInService } from '@modules/agents/services/agent-signin.service'

export class AuthController {
  public async signup(request: Request, response: Response): Promise<void> {
    const { name, email, password } = request.body

    const service = container.resolve(AgentSignUpService)

    const result = await service.execute({
      name,
      email,
      password
    })

    if (result.isRight()) {
      ok(response, {
        agent: AgentMapper.toDTO(result.value.agent),
        token: result.value.token
      })
    } else {
      fail(response, result.value)
    }
  }

  public async signin(request: Request, response: Response): Promise<void> {
    const { email, password } = request.body

    const service = container.resolve(AgentSignInService)

    const result = await service.execute({
      email,
      password
    })

    if (result.isRight()) {
      ok(response, {
        agent: AgentMapper.toDTO(result.value.agent),
        token: result.value.token
      })
    } else {
      fail(response, result.value)
    }
  }
}
