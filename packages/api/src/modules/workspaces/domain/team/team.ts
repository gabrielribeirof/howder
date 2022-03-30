import { AggregateRoot } from '@shared/core/domain/aggregate-root'
import { Identifier } from '@shared/core/domain/identifier'
import { Violation } from '@shared/core/errors/violation'
import { Either, right } from '@shared/core/logic/either'

import { Name } from '@shared/domain/name'
import { TeamMember } from './team-member'
import { TeamMembers } from './team-members'

interface TeamProperties {
  name: Name
  creator_id: Identifier
  workspace_id: Identifier
  members: TeamMembers
}

export class Team extends AggregateRoot<TeamProperties> {
  public get name(): Name {
    return this.properties.name
  }

  public set name(name: Name) {
    this.properties.name = name
  }

  public get creator_id(): Identifier {
    return this.properties.creator_id
  }

  public get workspace_id(): Identifier {
    return this.properties.workspace_id
  }

  public get members(): TeamMembers {
    return this.properties.members
  }

  private constructor(properties: TeamProperties, id?: Identifier) {
    super(properties, id)
  }

  public addMember(teamMember: TeamMember): void {
    this.properties.members.add(teamMember)
  }

  public removeMember(teamMember: TeamMember): void {
    this.properties.members.remove(teamMember)
  }

  public static create(properties: TeamProperties, id?: Identifier): Either<Violation[], Team> {
    return right(new Team({
      name: properties.name,
      creator_id: properties.creator_id,
      workspace_id: properties.workspace_id,
      members: properties.members
    }, id))
  }
}
