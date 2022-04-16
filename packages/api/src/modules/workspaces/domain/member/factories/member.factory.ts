import { Violation } from '@shared/core/errors/violation'
import { Identifier } from '@shared/core/domain/identifier'
import { combineLefts, Either, left } from '@shared/core/logic/either'

import { Member } from '../member'

type CreateMemberProperties = {
  id?: string
  agent_id: string
  workspace_id: string
  is_admin?: boolean
}

export function createMember(properties: CreateMemberProperties): Either<Violation[], Member> {
  const agent_id = Identifier.create(properties.agent_id, 'agent_id')
  const workspace_id = Identifier.create(properties.workspace_id, 'workspace_id')
  const is_admin = properties.is_admin ?? false

  if (agent_id.isLeft() || workspace_id.isLeft()) {
    return left(combineLefts(agent_id, workspace_id))
  }

  let id: Identifier | undefined

  if (properties.id) {
    const toId = Identifier.create(properties.id)

    if (toId.isLeft()) return left([toId.value])

    id = toId.value
  }

  return Member.create({
    agent_id: agent_id.value,
    workspace_id: workspace_id.value,
    is_admin
  }, id)
}
