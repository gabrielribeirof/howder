import { Violation } from '@shared/core/errors/violation'
import { Identifier } from '@shared/core/domain/identifier'
import { Either } from '@shared/core/logic/either'

import { Member } from '../member'

type CreateMemberProperties = {
  id?: string
  agent_id: string
  workspace_id: string
  is_admin?: boolean
}

export function createMember(properties: CreateMemberProperties): Either<Violation[], Member> {
  const id = properties.id ? new Identifier(properties.id) : undefined
  const agent_id = new Identifier(properties.agent_id)
  const workspace_id = new Identifier(properties.workspace_id)
  const is_admin = properties.is_admin ?? false

  return Member.create({
    agent_id,
    workspace_id,
    is_admin
  }, id)
}
