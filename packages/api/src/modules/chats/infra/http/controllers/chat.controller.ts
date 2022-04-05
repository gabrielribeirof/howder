import { container } from 'tsyringe'
import { Request, Response } from 'express'
import { ok } from '@shared/utils/http-response.utils'

import { ListChatsService } from '@modules/chats/services/list-chats.service'
import { OpenChatService } from '@modules/chats/services/open-chat.service'
import { CloseChatService } from '@modules/chats/services/close-chat.service'
import { AssignMemberToChatService } from '@modules/chats/services/assign-member-to-chat.service'
import { UnassignMemberFromChatService } from '@modules/chats/services/unassign-member-from-chat.service'

export class ChatController {
  public async index(request: Request, response: Response): Promise<void> {
    const { workspace_id } = request.body
    const { count, page, is_open } = request.query
    const { subject } = request.token_payload

    const service = container.resolve(ListChatsService)

    ok.either(response, await service.execute({
      workspace_id,
      count: Number(count),
      page: Number(page),
      is_open: String(is_open) === 'true',
      requester_id: subject
    }))
  }

  public async open(request: Request, response: Response): Promise<void> {
    const { chat_id } = request.params
    const { subject } = request.token_payload

    const service = container.resolve(OpenChatService)

    ok.either(response, await service.execute({
      chat_id,
      requester_id: subject
    }))
  }

  public async close(request: Request, response: Response): Promise<void> {
    const { chat_id } = request.params
    const { subject } = request.token_payload

    const service = container.resolve(CloseChatService)

    ok.either(response, await service.execute({
      chat_id,
      requester_id: subject
    }))
  }

  public async assign(request: Request, response: Response): Promise<void> {
    const { chat_id } = request.params
    const { subject } = request.token_payload

    const service = container.resolve(AssignMemberToChatService)

    ok.either(response, await service.execute({
      chat_id,
      requester_id: subject
    }))
  }

  public async unassign(request: Request, response: Response): Promise<void> {
    const { chat_id } = request.params
    const { subject } = request.token_payload

    const service = container.resolve(UnassignMemberFromChatService)

    ok.either(response, await service.execute({
      chat_id,
      requester_id: subject
    }))
  }
}
