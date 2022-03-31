import { AppError } from '@shared/core/errors/app-error'
import { Either, right, left } from '@shared/core/logic/either'

import { IMembersRepository } from '../repositories/imembers.repository'
import { ITeamsRepository } from '../repositories/iteams.repository'

import { UnknownMemberError } from '@shared/errors/unknown-member.error'
import { UnknownTeamError } from '@shared/errors/unknown-team.error'
import { UnauthorizedError } from '@shared/errors/unauthorized.error'

import { TeamMember } from '../domain/team/team-member'

type AddMemberToTeamRequest = {
  member_id: string
  team_id: string
  requester_id: string
}

export class AddMemberToTeamService {
  constructor(
    private membersRepository: IMembersRepository,
    private teamsRepository: ITeamsRepository
  ) {}

  public async execute({
    member_id,
    team_id,
    requester_id
  }: AddMemberToTeamRequest): Promise<Either<AppError, null>> {
    const member = await this.membersRepository.findById(member_id)

    if (!member) {
      return left(new UnknownMemberError())
    }

    const workspace_id = member.workspace_id.value

    const team = await this.teamsRepository.findByIdAndWorkspaceId(team_id, workspace_id)

    if (!team) {
      return left(new UnknownTeamError())
    }

    const requesterMember = await this.membersRepository.findByWorkspaceIdAndAgentId(workspace_id, requester_id)

    if (!requesterMember || !requesterMember.is_admin) {
      return left(new UnauthorizedError())
    }

    const teamMember = TeamMember.create({
      member_id: member.id
    })

    team.addMember(teamMember)

    await this.teamsRepository.save(team)

    return right(null)
  }
}
