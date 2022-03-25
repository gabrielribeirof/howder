import { Tag } from '../domain/tag/tag'

export interface ITagsRepository {
  findById(id: string): Promise<Tag | undefined>
  findByWorkspaceId(id: string): Promise<Tag[] | undefined>
  save(tag: Tag): Promise<void>
  delete(tag: Tag): Promise<void>
}
