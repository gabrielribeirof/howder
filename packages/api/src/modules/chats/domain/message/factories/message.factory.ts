import { Violation } from '@shared/core/errors/violation'
import { Identifier } from '@shared/core/domain/identifier'
import { combineLefts, Either, left } from '@shared/core/logic/either'

import { Message } from '../message'
import { AuthorType, AuthorTypeValue } from '../author-type'

type CreateMessageRequest = {
  id?: string
  chat_id: string
  author_id: string
  author_type: AuthorTypeValue
  content: string
}

export function createMessage(properties: CreateMessageRequest): Either<Violation[], Message> {
  const chat_id = Identifier.create(properties.chat_id, 'chat_id')
  const author_id = Identifier.create(properties.author_id, 'author_id')
  const author_type = AuthorType.create({ value: properties.author_type })

  if (chat_id.isLeft() || author_id.isLeft() || author_type.isLeft()) {
    return left(combineLefts(chat_id, author_id, author_type))
  }

  let id: Identifier | undefined

  if (properties.id) {
    const toId = Identifier.create(properties.id)

    if (toId.isLeft()) return left([toId.value])

    id = toId.value
  }

  return Message.create({
    chat_id: chat_id.value,
    author_id: author_id.value,
    author_type: author_type.value,
    content: properties.content
  }, id)
}
