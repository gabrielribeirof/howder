import { AggregateRoot } from '@shared/core/domain/aggregate-root'
import { Identifier } from '@shared/core/domain/identifier'
import { Violation } from '@shared/core/errors/violation'
import { Either, right } from '@shared/core/logic/either'

import { ChatData } from './chat-data'

interface ChatProperties {
  user_id: Identifier
  agent_id?: Identifier
  is_open: boolean
}

export class Chat extends AggregateRoot<ChatProperties> {
  public get user_id(): Identifier {
    return this.properties.user_id
  }

  public get agent_id(): Identifier | undefined {
    return this.properties.agent_id
  }

  public get is_open(): boolean {
    return this.properties.is_open
  }

  private constructor(properties: ChatProperties, id?: Identifier) {
    super(properties, id)
  }

  public open(): void {
    if (!this.is_open) {
      this.properties.is_open = true
    }
  }

  public close(): void {
    if (this.is_open) {
      this.properties.is_open = false
    }
  }

  public static create(properties: ChatData, id?: Identifier): Either<Violation[], Chat> {
    const user_id = new Identifier(properties.user_id)
    const agent_id = properties.agent_id ? new Identifier(properties.agent_id) : undefined
    const is_open = properties.is_open ?? true

    return right(new Chat({
      user_id,
      agent_id,
      is_open
    }, id))
  }
}
