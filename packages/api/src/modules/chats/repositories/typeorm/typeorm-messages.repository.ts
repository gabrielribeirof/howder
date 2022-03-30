import { Repository, getRepository } from 'typeorm'

import { Message } from '@modules/chats/domain/message/message'
import { MessageMapper } from '@modules/chats/mappers/message.mapper'
import { MessageEntity } from '@shared/infra/typeorm/entities/message.entity'
import { IMessagesRespository } from '../imessages.repository'

export class TypeORMMessagesRespository implements IMessagesRespository {
  private ormRepository: Repository<MessageEntity>

  constructor() {
    this.ormRepository = getRepository(MessageEntity)
  }

  public async save(message: Message): Promise<void> {
    await this.ormRepository.save(MessageMapper.toPersistence(message))
  }
}
