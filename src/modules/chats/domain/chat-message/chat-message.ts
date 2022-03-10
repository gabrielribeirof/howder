import { AggregateRoot } from '@shared/core/domain/aggregate-root'
import { Identifier } from '@shared/core/domain/identifier'
import { Violation } from '@shared/core/errors/violation'
import { Either, right, left } from '@shared/core/logic/either'

import { ChatMessageData } from './chat-message-data'

import { AuthorType } from './author-type'

interface ChatMessageProperties {
  chat_id: Identifier
  author_id: Identifier
  author_type: AuthorType
  content: string
}

export class ChatMessage extends AggregateRoot<ChatMessageProperties> {
  public get chat_id(): Identifier {
    return this.properties.chat_id
  }

  public get author_id(): Identifier {
    return this.properties.author_id
  }

  public get author_type(): AuthorType {
    return this.properties.author_type
  }

  public get content(): string {
    return this.properties.content
  }

  private constructor(properties: ChatMessageProperties, id?: Identifier) {
    super(properties, id)
  }

  public static create(properties: ChatMessageData, id?: Identifier): Either<Violation[], ChatMessage> {
    const chat_id = new Identifier(properties.chat_id)
    const author_id = new Identifier(properties.author_id)
    const author_type = AuthorType.create(properties.author_type)

    if (author_type.isLeft()) {
      return left([author_type.value])
    }

    return right(new ChatMessage({
      chat_id,
      author_id,
      author_type: author_type.value,
      content: properties.content
    }, id))
  }
}
