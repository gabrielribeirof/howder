import { Violation } from '@shared/core/errors/violation'
import { Identifier } from '@shared/core/domain/identifier'
import { Either, left } from '@shared/core/logic/either'

import { Name } from '@shared/domain/name'
import { Team } from '../team'
import { TeamMember } from '../team-member'
import { TeamMembers } from '../team-members'

type CreateTeamProperties = {
  name: string
  creator_id: string
  workspace_id: string
  members?: TeamMember[]
}

export function createTeam(properties: CreateTeamProperties): Either<Violation[], Team> {
  const name = Name.create({ value: properties.name })
  const creator_id = new Identifier(properties.creator_id)
  const workspace_id = new Identifier(properties.workspace_id)
  const members = TeamMembers.create(properties.members)

  if (name.isLeft()) {
    return left([name.value])
  }

  return Team.create({
    name: name.value,
    creator_id,
    workspace_id,
    members
  })
}
