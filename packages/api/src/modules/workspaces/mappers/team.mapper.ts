import { Identifier } from '@shared/core/domain/identifier'

import { Team } from '../domain/team/team'
import { TeamMember } from '../domain/team/team-member'
import { createTeam } from '../domain/team/factories/team.factory'
import { TeamDTO } from '../dtos/team.dto'
import { TeamEntity } from '@infra/typeorm/entities/team.entity'
import { MemberEntity } from '@infra/typeorm/entities/member.entity'

export class TeamMapper {
  public static toDTO(team: Team): TeamDTO {
    return {
      id: team.id.value,
      name: team.name.value,
      creator_id: team.creator_id.value,
      workspace_id: team.workspace_id.value,
      members_id: team.members.getItems().map(m => m.member_id.value)
    }
  }

  public static toDomain(team: TeamEntity): Team {
    const result = createTeam({
      id: team.id,
      name: team.name,
      creator_id: team.creator_id,
      workspace_id: team.workspace_id,
      members: team.members_id.map(id => TeamMember.create({ member_id: new Identifier(id) }))
    })

    if (result.isLeft()) throw new Error('Error on TeamMapper.toDomain()')

    return result.value
  }

  public static toPersistence(team: Team): TeamEntity {
    let members: MemberEntity[] | undefined

    if (team.members.getItems()) {
      members = team.members.getItems().map(m => {
        const member = new MemberEntity()

        member.id = m.member_id.value

        return member
      })
    }

    const t = new TeamEntity()

    t.id = team.id.value
    t.name = team.name.value
    t.workspace_id = team.workspace_id.value
    t.creator_id = team.creator_id.value
    members && (t.members = members)

    return t
  }
}
