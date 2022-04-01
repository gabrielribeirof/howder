import { injectable, inject } from 'tsyringe'
import { AppError } from '@shared/core/errors/app-error'
import { Either, right, left } from '@shared/core/logic/either'

import { IMembersRepository } from '../repositories/imembers.repository'
import { IWorkspacesRespository } from '../repositories/iworkspaces.repository'

import { UnknownMemberError } from '@shared/errors/unknown-member.error'
import { UnknownWorkspaceError } from '@shared/errors/unknown-workspace.error'
import { UnauthorizedError } from '@shared/errors/unauthorized.error'

type DeleteMemberRequest = {
  member_id: string
  requester_id: string
}

@injectable()
export class DeleteMemberService {
  constructor(
    @inject('MembersRepository')
    private membersRepository: IMembersRepository,
    @inject('WorkspacesRespository')
    private workspacesRespository: IWorkspacesRespository
  ) {}

  public async execute({
    member_id,
    requester_id
  }: DeleteMemberRequest): Promise<Either<AppError, null>> {
    const member = await this.membersRepository.findById(member_id)

    if (!member) {
      return left(new UnknownMemberError())
    }

    const workspace = await this.workspacesRespository.findById(member.workspace_id.value)

    if (!workspace) {
      return left(new UnknownWorkspaceError())
    }

    const requesterMember = await this.membersRepository
      .findByWorkspaceIdAndAgentId(workspace.id.value, requester_id)

    if (!requesterMember || !requesterMember.is_admin) {
      return left(new UnauthorizedError())
    }

    if (requesterMember.id.value === member_id) {
      return left(new UnauthorizedError())
    }

    if (workspace.creator_id.equals(member.agent_id)) {
      return left(new UnauthorizedError())
    }

    await this.membersRepository.delete(member)

    return right(null)
  }
}
