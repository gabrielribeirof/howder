import { Violation } from '@shared/core/errors/violation'
import { Identifier } from '@shared/core/domain/identifier'
import { Either, left } from '@shared/core/logic/either'

import { Tag } from '../tag'
import { Name } from '@shared/domain/name'

type CreateTagRequest = {
  id?: string
  name: string
  creator_id: string
  workspace_id: string
}

export function createTag(properties: CreateTagRequest): Either<Violation[], Tag> {
  const id = properties.id ? new Identifier(properties.id) : undefined
  const name = Name.create({ value: properties.name })
  const creator_id = new Identifier(properties.creator_id)
  const workspace_id = new Identifier(properties.workspace_id)

  if (name.isLeft()) {
    return left([name.value])
  }

  return Tag.create({
    name: name.value,
    creator_id,
    workspace_id
  }, id)
}
