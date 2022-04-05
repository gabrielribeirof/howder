import { container } from 'tsyringe'
import { Request, Response } from 'express'
import { ok } from '@shared/utils/http-response.utils'

import { CreateMessageService } from '@modules/chats/services/create-message.service'

export class MessageController {
  public async store(request: Request, response: Response): Promise<void> {
    const { content } = request.body
    const { chat_id } = request.params
    const { subject, bearer_type } = request.token_payload

    const service = container.resolve(CreateMessageService)

    ok.either(response, await service.execute({
      chat_id,
      content,
      requester_type: bearer_type,
      requester_id: subject
    }))
  }
}
