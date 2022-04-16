import { Violation } from '@shared/core/errors/violation'
import { Identifier } from '@shared/core/domain/identifier'
import { combineLefts, Either, left } from '@shared/core/logic/either'

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
  const user_id = Identifier.create(properties.user_id, 'user_id')
  const workspace_id = Identifier.create(properties.workspace_id, 'workspace_id')
  const tags = ChatTags.create(properties.tags)

  if (user_id.isLeft() || workspace_id.isLeft()) {
    return left(combineLefts(user_id, workspace_id))
  }

  let id: Identifier | undefined
  let member_id: Identifier | undefined

  if (properties.id) {
    const toId = Identifier.create(properties.id)

    if (toId.isLeft()) return left([toId.value])

    id = toId.value
  }

  if (properties.member_id) {
    const toId = Identifier.create(properties.member_id)

    if (toId.isLeft()) return left([toId.value])

    member_id = toId.value
  }

  return Chat.create({
    user_id: user_id.value,
    member_id,
    workspace_id: workspace_id.value,
    tags,
    is_open: properties.is_open ?? true
  }, id)
}
