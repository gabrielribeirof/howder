import { AggregateRoot } from '@shared/core/domain/aggregate-root'
import { Identifier } from '@shared/core/domain/identifier'
import { Violation } from '@shared/core/errors/violation'
import { Either, right } from '@shared/core/logic/either'

import { Member } from '@modules/workspaces/domain/member/member'
import { ChatTag } from './chat-tag'
import { ChatTags } from './chat-tags'

interface ChatProperties {
  user_id: Identifier
  member_id?: Identifier
  workspace_id: Identifier
  tags: ChatTags
  is_open: boolean
}

export class Chat extends AggregateRoot<ChatProperties> {
  public get user_id(): Identifier {
    return this.properties.user_id
  }

  public get member_id(): Identifier | undefined {
    return this.properties.member_id
  }

  public get workspace_id(): Identifier {
    return this.properties.workspace_id
  }

  public get tags(): ChatTags {
    return this.properties.tags
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

  public addTag(chatTag: ChatTag): void {
    this.properties.tags.add(chatTag)
  }

  public removeTag(chatTag: ChatTag): void {
    this.properties.tags.remove(chatTag)
  }

  public assignMember(member: Member): void {
    if (!this.member_id) {
      this.properties.member_id = member.id
    }
  }

  public unassignMember(): void {
    if (this.member_id) {
      this.properties.member_id = undefined
    }
  }

  public static create(properties: ChatProperties, id?: Identifier): Either<Violation[], Chat> {
    return right(new Chat({
      user_id: properties.user_id,
      member_id: properties.member_id,
      workspace_id: properties.workspace_id,
      tags: properties.tags,
      is_open: properties.is_open
    }, id))
  }
}
