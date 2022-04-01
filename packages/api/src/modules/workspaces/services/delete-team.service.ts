import { injectable, inject } from 'tsyringe'
import { AppError } from '@shared/core/errors/app-error'
import { Either, right, left } from '@shared/core/logic/either'

import { ITeamsRepository } from '../repositories/iteams.repository'
import { IMembersRepository } from '../repositories/imembers.repository'

import { UnknownTeamError } from '@shared/errors/unknown-team.error'
import { UnauthorizedError } from '@shared/errors/unauthorized.error'

type DeleteTeamRequest = {
  team_id: string
  requester_id: string
}

@injectable()
export class DeleteTeamService {
  constructor(
    @inject('TeamsRepository')
    private teamsRepository: ITeamsRepository,
    @inject('MembersRepository')
    private membersRepository: IMembersRepository
  ) {}

  public async execute({
    team_id,
    requester_id
  }: DeleteTeamRequest): Promise<Either<AppError, null>> {
    const team = await this.teamsRepository.findById(team_id)

    if (!team) {
      return left(new UnknownTeamError())
    }

    const requesterMember = await this.membersRepository
      .findByWorkspaceIdAndAgentId(team.workspace_id.value, requester_id)

    if (!requesterMember || !requesterMember.is_admin) {
      return left(new UnauthorizedError())
    }

    await this.teamsRepository.delete(team)

    return right(null)
  }
}
