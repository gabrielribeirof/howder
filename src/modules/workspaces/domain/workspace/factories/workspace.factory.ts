import { Violation } from '@shared/core/errors/violation'
import { Identifier } from '@shared/core/domain/identifier'
import { Either, left } from '@shared/core/logic/either'

import { Workspace } from '../workspace'
import { Name } from '@shared/domain/name'

type CreateWorkspaceRequest = {
  id?: string
  name: string
  creator_id: string
}

export function createWorkspace(properties: CreateWorkspaceRequest): Either<Violation[], Workspace> {
  const id = properties.id ? new Identifier(properties.id) : undefined
  const name = Name.create({ value: properties.name })
  const creator_id = new Identifier(properties.creator_id)

  if (name.isLeft()) {
    return left([name.value])
  }

  return Workspace.create({
    name: name.value,
    creator_id
  })
}
