import { Identifier } from '@shared/core/domain/identifier'

import { Chat } from '../domain/chat/chat'
import { ChatTag } from '../domain/chat/chat-tag'
import { ChatDTO } from '../dtos/chat.dto'
import { ChatEntity } from '@shared/infra/typeorm/entities/chat.entity'
import { TagEntity } from '@shared/infra/typeorm/entities/tag.entity'
import { createChat } from '../domain/chat/factories/chat.factory'

export class ChatMapper {
  public static toDTO(chat: Chat): ChatDTO {
    return {
      id: chat.id.value,
      user_id: chat.user_id.value,
      member_id: chat.member_id?.value,
      workspace_id: chat.workspace_id.value,
      tags_id: chat.tags.getItems().map(t => t.tag_id.value),
      is_open: chat.is_open
    }
  }

  public static toDomain(chat: ChatEntity): Chat {
    const result = createChat({
      id: chat.id,
      user_id: chat.user_id,
      member_id: chat.member_id,
      workspace_id: chat.workspace_id,
      tags: chat.tags_id.map(id => ChatTag.create({ tag_id: new Identifier(id) })),
      is_open: chat.is_open
    })

    if (result.isLeft()) throw new Error('Error on ChatMapper.toDomain()')

    return result.value
  }

  public static toPersistence(chat: Chat): ChatEntity {
    let tags: TagEntity[] | undefined

    if (chat.tags.getItems()) {
      tags = chat.tags.getItems().map(t => {
        const tag = new TagEntity()

        tag.id = t.tag_id.value

        return tag
      })
    }

    const c = new ChatEntity()

    c.id = chat.id.value
    c.user_id = chat.user_id.value
    c.member_id = chat.member_id ? chat.member_id.value : ''
    c.workspace_id = chat.workspace_id.value
    c.is_open = chat.is_open
    tags && (c.tags = tags)

    return c
  }
}
