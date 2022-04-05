import { container } from 'tsyringe'
import { Request, Response } from 'express'
import { ok } from '@shared/utils/http-response.utils'

import { ListUsersService } from '@modules/users/services/list-users.service'

export class UserController {
  public async index(request: Request, response: Response): Promise<void> {
    const { workspace_id } = request.params
    const { subject } = request.token_payload

    const service = container.resolve(ListUsersService)

    ok.either(response, await service.execute({
      workspace_id,
      requester_id: subject
    }))
  }
}
