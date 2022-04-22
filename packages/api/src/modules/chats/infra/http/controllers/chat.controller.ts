import { container } from 'tsyringe'
import { Request, Response } from 'express'
import { ok, fail } from '@shared/utils/http-response.utils'

import { ChatMapper } from '@modules/chats/mappers/chat.mapper'

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

    const result = await service.execute({
      workspace_id,
      count: Number(count),
      page: Number(page),
      is_open: (String(is_open) === 'true' || String(is_open) === 'false') ? String(is_open) === 'true' : undefined,
      requester_id: subject
    })

    if (result.isRight()) {
      ok(response, result.value.map(c => ChatMapper.toDTO(c)))
    } else {
      fail(response, result.value)
    }
  }

  public async open(request: Request, response: Response): Promise<void> {
    const { chat_id } = request.params
    const { subject } = request.token_payload

    const service = container.resolve(OpenChatService)

    const result = await service.execute({
      chat_id,
      requester_id: subject
    })

    if (result.isRight()) {
      ok(response)
    } else {
      fail(response, result.value)
    }
  }

  public async close(request: Request, response: Response): Promise<void> {
    const { chat_id } = request.params
    const { subject } = request.token_payload

    const service = container.resolve(CloseChatService)

    const result = await service.execute({
      chat_id,
      requester_id: subject
    })

    if (result.isRight()) {
      ok(response)
    } else {
      fail(response, result.value)
    }
  }

  public async assign(request: Request, response: Response): Promise<void> {
    const { chat_id } = request.params
    const { subject } = request.token_payload

    const service = container.resolve(AssignMemberToChatService)

    const result = await service.execute({
      chat_id,
      requester_id: subject
    })

    if (result.isRight()) {
      ok(response)
    } else {
      fail(response, result.value)
    }
  }

  public async unassign(request: Request, response: Response): Promise<void> {
    const { chat_id } = request.params
    const { subject } = request.token_payload

    const service = container.resolve(UnassignMemberFromChatService)

    const result = await service.execute({
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
