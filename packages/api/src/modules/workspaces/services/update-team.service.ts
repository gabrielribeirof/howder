import { injectable, inject } from 'tsyringe'
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

@injectable()
export class UpdateTeamService {
  constructor(
    @inject('TeamsRepository')
    private teamsRepository: ITeamsRepository,
    @inject('MembersRepository')
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

    const workspace_id = team.workspace_id.value

    const requesterMember = await this.membersRepository.findByWorkspaceIdAndAgentId(workspace_id, requester_id)

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
