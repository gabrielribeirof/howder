import { container } from 'tsyringe'
import { Request, Response } from 'express'
import { ok, fail } from '@shared/utils/http-response.utils'

import { AddTagToChatService } from '@modules/chats/services/add-tag-to-chat.service'
import { RemoveTagFromChatService } from '@modules/chats/services/remove-tag-from-chat.service'

export class ChatTagController {
  public async store(request: Request, response: Response): Promise<void> {
    const { chat_id, tag_id } = request.params
    const { subject } = request.token_payload

    const service = container.resolve(AddTagToChatService)

    const result = await service.execute({
      tag_id,
      chat_id,
      requester_id: subject
    })

    if (result.isRight()) {
      ok(response)
    } else {
      fail(response, result.value)
    }
  }

  public async destroy(request: Request, response: Response): Promise<void> {
    const { chat_id, tag_id } = request.params
    const { subject } = request.token_payload

    const service = container.resolve(RemoveTagFromChatService)

    const result = await service.execute({
      tag_id,
      chat_id,
      requester_id: subject
    })

    if (result.isRight()) {
      ok(response)
    } else {
      fail(response, result.value)
    }
  }
}
