import { AggregateRoot } from '@shared/core/domain/aggregate-root'
import { Identifier } from '@shared/core/domain/identifier'
import { Violation } from '@shared/core/errors/violation'
import { Either, left, right } from '@shared/core/logic/either'

import { ChatTagData } from './tag-data'

import { Name } from '@shared/domain/name'

interface ChatTagProperties {
  name: Name
  author_id: Identifier
}

export class ChatTag extends AggregateRoot<ChatTagProperties> {
  public get name(): Name {
    return this.properties.name
  }

  public get author_id(): Identifier {
    return this.properties.author_id
  }

  private constructor(properties: ChatTagProperties, id?: Identifier) {
    super(properties, id)
  }

  public static create(properties: ChatTagData, id?: Identifier): Either<Violation[], ChatTag> {
    const nameResult = Name.create(properties.name)
    const author_id = new Identifier(properties.author_id)

    if (nameResult.isLeft()) {
      return left([nameResult.value])
    }

    return right(new ChatTag({
      name: nameResult.value,
      author_id
    }, id))
  }
}
