import { Violation } from '@shared/core/errors/violation'
import { Identifier } from '@shared/core/domain/identifier'
import { combineLefts, Either, left } from '@shared/core/logic/either'

import { Name } from '@shared/domain/name'
import { Team } from '../team'
import { TeamMember } from '../team-member'
import { TeamMembers } from '../team-members'

type CreateTeamProperties = {
  id?: string
  name: string
  creator_id: string
  workspace_id: string
  members?: TeamMember[]
}

export function createTeam(properties: CreateTeamProperties): Either<Violation[], Team> {
  const name = Name.create({ value: properties.name })
  const creator_id = Identifier.create(properties.creator_id, 'creator_id')
  const workspace_id = Identifier.create(properties.workspace_id, 'workspace_id')
  const members = TeamMembers.create(properties.members)

  if (name.isLeft() || creator_id.isLeft() || workspace_id.isLeft()) {
    return left(combineLefts(name, creator_id, workspace_id))
  }

  let id: Identifier | undefined

  if (properties.id) {
    const toId = Identifier.create(properties.id)

    if (toId.isLeft()) return left([toId.value])

    id = toId.value
  }

  return Team.create({
    name: name.value,
    creator_id: creator_id.value,
    workspace_id: workspace_id.value,
    members
  }, id)
}
