import { AppError } from '@shared/core/errors/app-error'
import { Either, right, left } from '@shared/core/logic/either'

import { ITeamsRepository } from '../repositories/iteams.repository'
import { IMembersRepository } from '../repositories/imembers.repository'

import { InvalidParameterError } from '@shared/errors/invalid-parameter.error'
import { UnknownTeamError } from '@shared/errors/unknown-team.error'
import { UnauthorizedError } from '@shared/errors/unauthorized.error'

import { Team } from '../domain/team/team'
import { Name } from '@shared/domain/name'

type UpdateTeamRequest = {
  team_id: string
  name: string
  requester_id: string
}

export class UpdateTeamService {
  constructor(
    private teamsRepository: ITeamsRepository,
    private membersRepository: IMembersRepository
  ) {}

  public async execute({
    team_id,
    name,
    requester_id
  }: UpdateTeamRequest): Promise<Either<AppError, Team>> {
    const team = await this.teamsRepository.findById(team_id)

    if (!team) {
      return left(new UnknownTeamError())
    }

    const requesterMember = await this.membersRepository
      .findByWorkspaceIdAndAgentId(team.workspace_id.value, requester_id)

    if (!requesterMember || !requesterMember.is_admin) {
      return left(new UnauthorizedError())
    }

    const nameResult = Name.create({ value: name })

    if (nameResult.isLeft()) {
      return left(new InvalidParameterError([nameResult.value]))
    }

    team.name = nameResult.value

    await this.teamsRepository.save(team)

    return right(team)
  }
}
