import { injectable, inject } from 'tsyringe'
import { AppError } from '@shared/core/errors/app-error'
import { Either, right, left } from '@shared/core/logic/either'

import { IWorkspacesRespository } from '../repositories/iworkspaces.repository'
import { IMembersRepository } from '../repositories/imembers.repository'

import { UnauthorizedError } from '@shared/errors/unauthorized.error'
import { UnknownWorkspaceError } from '@shared/errors/unknown-workspace.error'

import { WorkspaceWithDetailsDTO } from '../dtos/workspace-with-details.dto'

type GetWorkspaceRequest = {
  workspace_id: string
  requester_id: string
}

@injectable()
export class GetWorkspaceService {
  constructor(
    @inject('WorkspacesRespository')
    private workspacesRespository: IWorkspacesRespository,
    @inject('MembersRepository')
    private membersRepository: IMembersRepository
  ) {}

  public async execute({
    workspace_id,
    requester_id
  }: GetWorkspaceRequest): Promise<Either<AppError, WorkspaceWithDetailsDTO>> {
    const member = await this.membersRepository.findByWorkspaceIdAndAgentId(workspace_id, requester_id)

    if (!member) {
      return left(new UnauthorizedError())
    }

    const workspace = await this.workspacesRespository.findByIdWithDetails(workspace_id)

    if (!workspace) {
      return left(new UnknownWorkspaceError())
    }

    return right(workspace)
  }
}
