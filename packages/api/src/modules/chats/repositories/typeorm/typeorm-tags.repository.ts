import { Repository, getRepository } from 'typeorm'

import { Tag } from '@modules/chats/domain/tag/tag'
import { TagMapper } from '@modules/chats/mappers/tag.mapper'
import { TagEntity } from '@infra/typeorm/entities/tag.entity'
import { ITagsRepository } from '../itags.repository'

export class TypeORMTagsRepository implements ITagsRepository {
  private ormRepository: Repository<TagEntity>

  constructor() {
    this.ormRepository = getRepository(TagEntity)
  }

  public async findById(id: string): Promise<Tag | undefined> {
    const tag = await this.ormRepository.findOne(id)

    return tag && TagMapper.toDomain(tag)
  }

  public async findByWorkspaceId(id: string): Promise<Tag[] | undefined> {
    const tags = await this.ormRepository.find({
      where: { id }
    })

    return tags && tags.map(t => TagMapper.toDomain(t))
  }

  public async save(tag: Tag): Promise<void> {
    await this.ormRepository.save(TagMapper.toPersistence(tag))
  }

  public async delete(tag: Tag): Promise<void> {
    await this.ormRepository.delete({ id: tag.id.value })
  }
}
