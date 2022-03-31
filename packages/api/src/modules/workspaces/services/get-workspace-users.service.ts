import { AppError } from '@shared/core/errors/app-error'
import { Either, right, left } from '@shared/core/logic/either'

import { IUsersRepository } from '@modules/users/repositories/iusers.repository'
import { IMembersRepository } from '../repositories/imembers.repository'

import { UnauthorizedError } from '@shared/errors/unauthorized.error'

import { User } from '@modules/users/domain/user/user'

type GetWorkspaceUsersRequest = {
  workspace_id: string
  requester_id: string
}

export class GetWorkspaceUsersService {
  constructor(
    private usersRepository: IUsersRepository,
    private membersRepository: IMembersRepository
  ) {}

  public async execute({
    workspace_id,
    requester_id
  }: GetWorkspaceUsersRequest): Promise<Either<AppError, User[]>> {
    const member = await this.membersRepository.findByWorkspaceIdAndAgentId(workspace_id, requester_id)

    if (!member) {
      return left(new UnauthorizedError())
    }

    const users = await this.usersRepository.findByWorkspaceId(workspace_id)

    return right(users || [])
  }
}
