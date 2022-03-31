import { AppError } from '@shared/core/errors/app-error'
import { Either, right, left } from '@shared/core/logic/either'

import { ITeamsRepository } from '../repositories/iteams.repository'
import { IMembersRepository } from '@modules/workspaces/repositories/imembers.repository'

import { InvalidParameterError } from '@shared/errors/invalid-parameter.error'
import { UnknownAgentError } from '@shared/errors/unknown-agent.error'
import { UnauthorizedError } from '@shared/errors/unauthorized.error'

import { Team } from '../domain/team/team'
import { createTeam } from '../domain/team/factories/team.factory'

type CreateTeamRequest = {
  name: string
  workspace_id: string
  creator_id: string
}

export class CreateTeamService {
  constructor(
    private teamsRepository: ITeamsRepository,
    private membersRepository: IMembersRepository
  ) {}

  public async execute({
    name,
    workspace_id,
    creator_id
  }: CreateTeamRequest): Promise<Either<AppError, Team>> {
    const creatorMember = await this.membersRepository
      .findByWorkspaceIdAndAgentId(workspace_id, creator_id)

    if (!creatorMember || !creatorMember.is_admin) {
      return left(new UnauthorizedError())
    }

    const team = createTeam({
      name,
      creator_id,
      workspace_id
    })

    if (team.isLeft()) {
      return left(new InvalidParameterError(team.value))
    }

    await this.teamsRepository.save(team.value)

    return right(team.value)
  }
}
