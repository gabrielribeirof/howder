import { AggregateRoot } from '@shared/core/domain/aggregate-root'
import { Identifier } from '@shared/core/domain/identifier'
import { Violation } from '@shared/core/errors/violation'
import { Either, right } from '@shared/core/logic/either'

import { AuthorType } from './author-type'

interface MessageProperties {
  chat_id: Identifier
  author_id: Identifier
  author_type: AuthorType
  content: string
}

export class Message extends AggregateRoot<MessageProperties> {
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

  private constructor(properties: MessageProperties, id?: Identifier) {
    super(properties, id)
  }

  public static create(properties: MessageProperties, id?: Identifier): Either<Violation[], Message> {
    return right(new Message({
      chat_id: properties.chat_id,
      author_id: properties.author_id,
      author_type: properties.author_type,
      content: properties.content
    }, id))
  }
}
