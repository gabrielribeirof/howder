import { Tag } from '@modules/chats/domain/tag/tag'
import { ITagsRepository } from '../itags.repository'

export class InMemoryTagsRepository implements ITagsRepository {
  public tags: Tag[] = []

  public async findById(id: string): Promise<Tag | undefined> {
    return this.tags.find(arrayTag => arrayTag.id.value === id)
  }

  public async findByWorkspaceId(id: string): Promise<Tag[] | undefined> {
    return this.tags.filter(arrayTag => arrayTag.workspace_id.value === id)
  }

  public async save(tag: Tag): Promise<void> {
    const index = this.tags.findIndex(arrayTag => arrayTag.id.equals(tag.id))

    if (index >= 0) {
      this.tags[index] = tag
      return
    }

    this.tags.push(tag)
  }

  public async delete(tag: Tag): Promise<void> {
    const index = this.tags.findIndex(arrayTag => arrayTag.id.equals(tag.id))

    this.tags.splice(index, 1)
  }
}
