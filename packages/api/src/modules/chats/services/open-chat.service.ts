import { AppError } from '@shared/core/errors/app-error'
import { Either, right, left } from '@shared/core/logic/either'

import { IChatsRepository } from '../repositories/ichats.repository'
import { IMembersRepository } from '@modules/workspaces/repositories/imembers.repository'

import { UnknownChatError } from '@shared/errors/unknown-chat.error'
import { UnknownMemberError } from '@shared/errors/unknown-member.error'
import { UnauthorizedError } from '@shared/errors/unauthorized.error'
import { ChatAlreadyOpenError } from '@shared/errors/chat-already-open.error'

type OpenChatRequest = {
  chat_id: string
  requester_id: string
}

export class OpenChatService {
  constructor(
    private chatsRepository: IChatsRepository,
    private membersRepository: IMembersRepository
  ) {}

  public async execute({
    chat_id,
    requester_id
  }: OpenChatRequest): Promise<Either<AppError, null>> {
    const chat = await this.chatsRepository.findById(chat_id)

    if (!chat) {
      return left(new UnknownChatError())
    }

    const member = await this.membersRepository
      .findByWorkspaceIdAndAgentId(chat.workspace_id.value, requester_id)

    if (!member) {
      return left(new UnknownMemberError())
    }

    if (chat.member_id?.value !== member.id.value) {
      return left(new UnauthorizedError())
    }

    if (chat.is_open) {
      return left(new ChatAlreadyOpenError())
    }

    chat.open()

    await this.chatsRepository.save(chat)

    return right(null)
  }
}
