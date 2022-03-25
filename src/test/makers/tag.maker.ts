import { Tag } from '@modules/chats/domain/tag/tag'
import { createTag } from '@modules/chats/domain/tag/factories/tag.factory'

type TagOverrides = {
  name?: string
  creator_id?: string
  workspace_id?: string
}

export function makeTag(overrides?: TagOverrides): Tag {
  const tag = createTag({
    name: overrides?.name ?? 'Tag Test Name',
    creator_id: overrides?.creator_id ?? 'creator-id',
    workspace_id: overrides?.workspace_id ?? 'workspace-id'
  })

  if (tag.isLeft()) throw new Error()

  return tag.value
}
