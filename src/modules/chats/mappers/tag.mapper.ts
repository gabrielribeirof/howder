import { Tag } from '../domain/tag/tag'
import { TagDTO } from '../dtos/tag.dto'
import { TagEntity } from '@shared/infra/typeorm/entities/tag.entity'
import { createTag } from '../domain/tag/factories/tag.factory'

export class TagMapper {
  public static toDTO(tag: Tag): TagDTO {
    return {
      id: tag.id.value,
      name: tag.name.value,
      creator_id: tag.creator_id.value,
      workspace_id: tag.workspace_id.value
    }
  }

  public static toDomain(tag: TagEntity): Tag {
    const result = createTag({
      id: tag.id,
      name: tag.name,
      creator_id: tag.creator_id,
      workspace_id: tag.workspace_id
    })

    if (result.isLeft()) throw new Error('Error on TagMapper.toDomain()')

    return result.value
  }

  public static toPersistence(tag: Tag): TagEntity {
    const t = new TagEntity()

    t.id = tag.id.value
    t.name = tag.name.value
    t.creator_id = tag.creator_id.value
    t.workspace_id = tag.workspace_id.value

    return t
  }
}
