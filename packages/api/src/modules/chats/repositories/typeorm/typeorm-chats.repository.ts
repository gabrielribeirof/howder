import { Repository, getRepository } from 'typeorm'

import { Chat } from '@modules/chats/domain/chat/chat'
import { ChatMapper } from '@modules/chats/mappers/chat.mapper'
import { ChatEntity } from '@infra/typeorm/entities/chat.entity'

import { IChatsRepository } from '../ichats.repository'

export class TypeORMChatsRepository implements IChatsRepository {
  private ormRepository: Repository<ChatEntity>

  constructor() {
    this.ormRepository = getRepository(ChatEntity)
  }

  public async findById(id: string): Promise<Chat | undefined> {
    const chat = await this.ormRepository.findOne(id)

    return chat && ChatMapper.toDomain(chat)
  }

  public async findOpenChatOfUserByUserId(user_id: string): Promise<Chat | undefined> {
    const chat = await this.ormRepository.findOne({
      where: {
        user_id,
        is_open: true
      }
    })

    return chat && ChatMapper.toDomain(chat)
  }

  public async findByWorkspaceId(
    workspace_id: string,
    count: number,
    page: number,
    is_open?: boolean
  ): Promise<Chat[] | undefined> {
    const chats = await this.ormRepository.find({
      where: {
        workspace_id,
        is_open
      },
      take: count,
      skip: page === 1 ? 0 : (page - 1) * count
    })

    if (!chats.length) return undefined

    return chats.map(c => ChatMapper.toDomain(c))
  }

  public async save(chat: Chat): Promise<void> {
    await this.ormRepository.save(ChatMapper.toPersistence(chat))
  }
}
