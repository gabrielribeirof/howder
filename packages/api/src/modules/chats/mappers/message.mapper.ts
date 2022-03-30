import { Message } from '../domain/message/message'
import { AuthorTypeValue } from '../domain/message/author-type'
import { MessageDTO } from '../dtos/message.dto'
import { MessageEntity } from '@shared/infra/typeorm/entities/message.entity'
import { createMessage } from '../domain/message/factories/message.factory'

export class MessageMapper {
  public static toDTO(message: Message): MessageDTO {
    return {
      id: message.id.value,
      chat_id: message.chat_id.value,
      author_id: message.author_id.value,
      author_type: message.author_type.value,
      content: message.content
    }
  }

  public static toDomain(message: MessageEntity): Message {
    const result = createMessage({
      id: message.id,
      chat_id: message.chat_id,
      author_id: message.author_id,
      author_type: message.author_type as AuthorTypeValue,
      content: message.content
    })

    if (result.isLeft()) throw new Error('Error on MessageMapper.toDomain()')

    return result.value
  }

  public static toPersistence(message: Message): MessageEntity {
    const m = new MessageEntity()

    m.id = message.id.value
    m.chat_id = message.chat_id.value
    m.author_id = message.author_id.value
    m.author_type = message.author_type.value
    m.content = message.content

    return m
  }
}
