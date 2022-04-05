import { container } from 'tsyringe'
import { Request, Response } from 'express'
import { ok } from '@shared/utils/http-response.utils'

import { StartSessionService } from '@modules/users/services/start-session.service'

export class SessionController {
  public async store(request: Request, response: Response): Promise<void> {
    const { name, email, workspace_id } = request.body

    const service = container.resolve(StartSessionService)

    ok.either(response, await service.execute({
      name,
      email,
      workspace_id
    }))
  }
}
