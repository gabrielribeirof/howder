import { container } from 'tsyringe'
import { Request, Response } from 'express'
import { ok, fail } from '@shared/utils/http-response.utils'

import { MessageMapper } from '@modules/chats/mappers/message.mapper'

import { CreateMessageService } from '@modules/chats/services/create-message.service'

export class MessageController {
  public async store(request: Request, response: Response): Promise<void> {
    const { chat_id, content } = request.body
    const { subject, bearer_type } = request.token_payload

    const service = container.resolve(CreateMessageService)

    const result = await service.execute({
      chat_id,
      content,
      requester_type: bearer_type,
      requester_id: subject
    })

    if (result.isRight()) {
      ok(response, MessageMapper.toDTO(result.value))
    } else {
      fail(response, result.value)
    }
  }
}
