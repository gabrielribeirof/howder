import { AppError } from '@shared/core/errors/app-error'
import { Either, right, left } from '@shared/core/logic/either'

import { IChatsRepository } from '../repositories/ichats.repository'
import { IMembersRepository } from '@modules/workspaces/repositories/imembers.repository'

import { UnknownChatError } from '@shared/errors/unknown-chat.error'
import { UnauthorizedError } from '@shared/errors/unauthorized.error'
import { ChatAlreadyClosedError } from '@shared/errors/chat-already-closed.error'
import { ChatHasNoMemberAssignedError } from '@shared/errors/chat-has-no-member-assigned.error'

type UnassignMemberFromChatRequest = {
  chat_id: string
  requester_id: string
}

export class UnassignMemberFromChatService {
  constructor(
    private chatsRepository: IChatsRepository,
    private membersRepository: IMembersRepository
  ) {}

  public async execute({
    chat_id,
    requester_id
  }: UnassignMemberFromChatRequest): Promise<Either<AppError, null>> {
    const chat = await this.chatsRepository.findById(chat_id)

    if (!chat) {
      return left(new UnknownChatError())
    }

    if (!chat.is_open) {
      return left(new ChatAlreadyClosedError())
    }

    const member = await this.membersRepository
      .findByWorkspaceIdAndAgentId(chat.workspace_id.value, requester_id)

    if (!member) {
      return left(new UnauthorizedError())
    }

    if (!chat.member_id) {
      return left(new ChatHasNoMemberAssignedError())
    }

    chat.unassignMember()

    await this.chatsRepository.save(chat)

    return right(null)
  }
}
