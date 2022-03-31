import { AppError } from '@shared/core/errors/app-error'
import { Either, right, left } from '@shared/core/logic/either'

import { IWorkspacesRespository } from '../repositories/iworkspaces.repository'

import { Workspace } from '../domain/workspace/workspace'

type ListWorkspacesRequest = {
  requester_id: string
}

export class ListWorkspacesService {
  constructor(private workspacesRepository: IWorkspacesRespository) {}

  public async execute({ requester_id }: ListWorkspacesRequest): Promise<Either<AppError, Workspace[]>> {
    const workspaces = await this.workspacesRepository.findForMemberAgentId(requester_id)

    return right(workspaces || [])
  }
}
