import { container } from 'tsyringe'
import { Request, Response } from 'express'
import { ok } from '@shared/utils/http-response.utils'

import { AgentSignUpService } from '@modules/agents/services/agent-signup.service'
import { AgentSignInService } from '@modules/agents/services/agent-signin.service'

export class AuthController {
  public async signup(request: Request, response: Response): Promise<void> {
    const { name, email, password } = request.body

    const service = container.resolve(AgentSignUpService)

    ok.either(response, await service.execute({
      name,
      email,
      password
    }))
  }

  public async signin(request: Request, response: Response): Promise<void> {
    const { email, password } = request.body

    const service = container.resolve(AgentSignInService)

    ok.either(response, await service.execute({
      email,
      password
    }))
  }
}
