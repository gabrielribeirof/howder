import { container } from 'tsyringe'
import { Request, Response } from 'express'
import { ok, fail } from '@shared/utils/http-response.utils'

import { UserMapper } from '@modules/users/mappers/user.mapper'
import { ChatMapper } from '@modules/chats/mappers/chat.mapper'

import { StartSessionService } from '@modules/users/services/start-session.service'

export class SessionController {
  public async store(request: Request, response: Response): Promise<void> {
    const { name, email, workspace_id } = request.body

    const service = container.resolve(StartSessionService)

    const result = await service.execute({
      name,
      email,
      workspace_id
    })

    if (result.isRight()) {
      ok(response, {
        user: UserMapper.toDTO(result.value.user),
        chat: ChatMapper.toDTO(result.value.chat),
        token: result.value.token
      })
    } else {
      fail(response, result.value)
    }
  }
}
