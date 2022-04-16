import { Violation } from '@shared/core/errors/violation'
import { Identifier } from '@shared/core/domain/identifier'
import { combineLefts, Either, left } from '@shared/core/logic/either'

import { Workspace } from '../workspace'
import { Name } from '@shared/domain/name'

type CreateWorkspaceRequest = {
  id?: string
  name: string
  creator_id: string
}

export function createWorkspace(properties: CreateWorkspaceRequest): Either<Violation[], Workspace> {
  const name = Name.create({ value: properties.name })
  const creator_id = Identifier.create(properties.creator_id, 'creator_id')

  if (name.isLeft() || creator_id.isLeft()) {
    return left(combineLefts(name, creator_id))
  }

  let id: Identifier | undefined

  if (properties.id) {
    const toId = Identifier.create(properties.id)

    if (toId.isLeft()) return left([toId.value])

    id = toId.value
  }

  return Workspace.create({
    name: name.value,
    creator_id: creator_id.value
  })
}
