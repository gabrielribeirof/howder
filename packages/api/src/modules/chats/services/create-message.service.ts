import { injectable, inject } from 'tsyringe'
import { AppError } from '@shared/core/errors/app-error'
import { Either, right, left } from '@shared/core/logic/either'
import { BearerType, BearerTypeValue } from '@shared/core/domain/bearer-type'

import { IMessagesRespository } from '../repositories/imessages.repository'
import { IChatsRepository } from '../repositories/ichats.repository'

import { InvalidParameterError } from '@shared/errors/invalid-parameter.error'
import { UnauthorizedError } from '@shared/errors/unauthorized.error'
import { UnknownChatError } from '@shared/errors/unknown-chat.error'
import { ChatAlreadyClosedError } from '@shared/errors/chat-already-closed.error'

import { Message } from '../domain/message/message'
import { createMessage } from '../domain/message/factories/message.factory'

type CreateMessageRequest = {
  chat_id: string
  content: string
  requester_id: string
  requester_type: BearerTypeValue
}

@injectable()
export class CreateMessageService {
  constructor(
    @inject('MessagesRespository')
    private messagesRepository: IMessagesRespository,
    @inject('ChatsRepository')
    private chatsRepository: IChatsRepository
  ) {}

  public async execute({
    chat_id,
    content,
    requester_id,
    requester_type
  }: CreateMessageRequest): Promise<Either<AppError, Message>> {
    const chat = await this.chatsRepository.findById(chat_id)

    if (!chat) {
      return left(new UnknownChatError())
    }

    if (!chat.is_open) {
      return left(new ChatAlreadyClosedError())
    }

    const bearer = new BearerType(requester_type)

    if (bearer.isMember()) {
      if (!chat.member_id || chat.member_id.value !== requester_id) {
        return left(new UnauthorizedError())
      }
    }

    if (bearer.isUser()) {
      if (chat.user_id.value !== requester_id) {
        return left(new UnauthorizedError())
      }
    }

    const message = createMessage({
      chat_id,
      author_id: requester_id,
      author_type: bearer.value,
      content
    })

    if (message.isLeft()) {
      return left(new InvalidParameterError(message.value))
    }

    await this.messagesRepository.save(message.value)

    return right(message.value)
  }
}
