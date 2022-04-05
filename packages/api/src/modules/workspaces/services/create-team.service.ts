import { injectable, inject } from 'tsyringe'
import { AppError } from '@shared/core/errors/app-error'
import { Either, right, left } from '@shared/core/logic/either'

import { ITeamsRepository } from '../repositories/iteams.repository'
import { IMembersRepository } from '@modules/workspaces/repositories/imembers.repository'

import { InvalidParameterError } from '@shared/errors/invalid-parameter.error'
import { UnauthorizedError } from '@shared/errors/unauthorized.error'

import { Team } from '../domain/team/team'
import { createTeam } from '../domain/team/factories/team.factory'

type CreateTeamRequest = {
  workspace_id: string
  name: string
  requester_id: string
}

@injectable()
export class CreateTeamService {
  constructor(
    @inject('TeamsRepository')
    private teamsRepository: ITeamsRepository,
    @inject('MembersRepository')
    private membersRepository: IMembersRepository
  ) {}

  public async execute({
    workspace_id,
    name,
    requester_id
  }: CreateTeamRequest): Promise<Either<AppError, Team>> {
    const creatorMember = await this.membersRepository.findByWorkspaceIdAndAgentId(workspace_id, requester_id)

    if (!creatorMember || !creatorMember.is_admin) {
      return left(new UnauthorizedError())
    }

    const team = createTeam({
      name,
      creator_id: requester_id,
      workspace_id
    })

    if (team.isLeft()) {
      return left(new InvalidParameterError(team.value))
    }

    await this.teamsRepository.save(team.value)

    return right(team.value)
  }
}
