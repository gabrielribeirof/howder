import { Violation } from '@shared/core/errors/violation'
import { Identifier } from '@shared/core/domain/identifier'
import { Either, left } from '@shared/core/logic/either'

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
  const id = properties.id ? new Identifier(properties.id) : undefined
  const chat_id = new Identifier(properties.chat_id)
  const author_id = new Identifier(properties.author_id)
  const author_type = AuthorType.create({ value: properties.author_type })

  if (author_type.isLeft()) {
    return left([author_type.value])
  }

  return Message.create({
    chat_id,
    author_id,
    author_type: author_type.value,
    content: properties.content
  }, id)
}
