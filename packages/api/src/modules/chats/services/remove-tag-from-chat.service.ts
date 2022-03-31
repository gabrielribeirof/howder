import { AppError } from '@shared/core/errors/app-error'
import { Either, right, left } from '@shared/core/logic/either'

import { IChatsRepository } from '../repositories/ichats.repository'
import { ITagsRepository } from '../repositories/itags.repository'
import { IMembersRepository } from '@modules/workspaces/repositories/imembers.repository'

import { UnknownChatError } from '@shared/errors/unknown-chat.error'
import { UnknownTagError } from '@shared/errors/unknown-tag.error'
import { UnauthorizedError } from '@shared/errors/unauthorized.error'
import { NotFoundError } from '@shared/errors/not-found.error'

import { ChatTag } from '../domain/chat/chat-tag'

type RemoveTagToChatRequest = {
  tag_id: string
  chat_id: string
  requester_id: string
}

export class RemoveTagFromChatService {
  constructor(
    private chatsRepository: IChatsRepository,
    private tagsRepository: ITagsRepository,
    private membersRepository: IMembersRepository
  ) {}

  public async execute({
    tag_id,
    chat_id,
    requester_id
  }: RemoveTagToChatRequest): Promise<Either<AppError, null>> {
    const chat = await this.chatsRepository.findById(chat_id)

    if (!chat) {
      return left(new UnknownChatError())
    }

    const tag = await this.tagsRepository.findById(tag_id)

    if (!tag) {
      return left(new UnknownTagError())
    }

    const member = await this.membersRepository
      .findByWorkspaceIdAndAgentId(chat.workspace_id.value, requester_id)

    if (!member) {
      return left(new UnauthorizedError())
    }

    if (chat.member_id?.value !== member.id.value) {
      if (!member.is_admin) {
        return left(new UnauthorizedError())
      }
    }

    const chatTag = ChatTag.create({ tag_id: tag.id })

    if (!chat.tags.exists(chatTag)) {
      return left(new NotFoundError())
    }

    chat.removeTag(chatTag)

    await this.chatsRepository.save(chat)

    return right(null)
  }
}
