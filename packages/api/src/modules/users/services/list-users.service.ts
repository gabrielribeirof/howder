import { injectable, inject } from 'tsyringe'
import { AppError } from '@shared/core/errors/app-error'
import { Either, right, left } from '@shared/core/logic/either'

import { IUsersRepository } from '@modules/users/repositories/iusers.repository'
import { IMembersRepository } from '@modules/workspaces/repositories/imembers.repository'

import { UnauthorizedError } from '@shared/errors/unauthorized.error'

import { User } from '@modules/users/domain/user/user'

type ListUsersRequest = {
  workspace_id: string
  requester_id: string
}

@injectable()
export class ListUsersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('MembersRepository')
    private membersRepository: IMembersRepository
  ) {}

  public async execute({
    workspace_id,
    requester_id
  }: ListUsersRequest): Promise<Either<AppError, User[]>> {
    const member = await this.membersRepository.findByWorkspaceIdAndAgentId(workspace_id, requester_id)

    if (!member) {
      return left(new UnauthorizedError())
    }

    const users = await this.usersRepository.findByWorkspaceId(workspace_id)

    return right(users || [])
  }
}
