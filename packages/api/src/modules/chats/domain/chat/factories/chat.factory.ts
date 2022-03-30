import { Violation } from '@shared/core/errors/violation'
import { Identifier } from '@shared/core/domain/identifier'
import { Either } from '@shared/core/logic/either'

import { Chat } from '../chat'
import { ChatTag } from '../chat-tag'
import { ChatTags } from '../chat-tags'

type CreateChatRequest = {
  id?: string
  user_id: string
  member_id?: string
  workspace_id: string
  tags?: ChatTag[]
  is_open?: boolean
}

export function createChat(properties: CreateChatRequest): Either<Violation[], Chat> {
  const id = properties.id ? new Identifier(properties.id) : undefined
  const user_id = new Identifier(properties.user_id)
  const workspace_id = new Identifier(properties.workspace_id)
  const member_id = properties.member_id ? new Identifier(properties.member_id) : undefined
  const tags = ChatTags.create(properties.tags)

  return Chat.create({
    user_id,
    member_id,
    workspace_id,
    tags,
    is_open: properties.is_open ?? true
  }, id)
}
