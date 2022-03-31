import { AppError } from '@shared/core/errors/app-error'
import { Either, right, left } from '@shared/core/logic/either'

import { IMembersRepository } from '../repositories/imembers.repository'
import { IWorkspacesRespository } from '../repositories/iworkspaces.repository'

import { UnknownWorkspaceError } from '@shared/errors/unknown-workspace.error'
import { UnauthorizedError } from '@shared/errors/unauthorized.error'

type DeleteWorkspaceRequest = {
  workspace_id: string
  requester_id: string
}

export class DeleteWorkspaceService {
  constructor(
    private workspacesRespository: IWorkspacesRespository,
    private membersRepository: IMembersRepository
  ) {}

  public async execute({
    workspace_id,
    requester_id
  }: DeleteWorkspaceRequest): Promise<Either<AppError, null>> {
    const workspace = await this.workspacesRespository.findById(workspace_id)

    if (!workspace) {
      return left(new UnknownWorkspaceError())
    }

    const requesterMember = await this.membersRepository.findByWorkspaceIdAndAgentId(workspace.id.value, requester_id)

    if (!requesterMember) {
      return left(new UnauthorizedError())
    }

    if (!workspace.creator_id.equals(requesterMember.agent_id)) {
      return left(new UnauthorizedError())
    }

    await this.workspacesRespository.delete(workspace)

    return right(null)
  }
}
