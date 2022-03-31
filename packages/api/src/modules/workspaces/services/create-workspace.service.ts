import { AppError } from '@shared/core/errors/app-error'
import { Either, right, left } from '@shared/core/logic/either'

import { IWorkspacesRespository } from '../repositories/iworkspaces.repository'

import { InvalidParameterError } from '@shared/errors/invalid-parameter.error'

import { Workspace } from '../domain/workspace/workspace'
import { createWorkspace } from '../domain/workspace/factories/workspace.factory'
import { createMember } from '../domain/member/factories/member.factory'

type CreateWorkspaceRequest = {
  name: string
  requester_id: string
}

export class CreateWorkspaceService {
  constructor(private workspacesRepository: IWorkspacesRespository) {}

  public async execute({
    name,
    requester_id
  }: CreateWorkspaceRequest): Promise<Either<AppError, Workspace>> {
    const workspace = createWorkspace({ name, creator_id: requester_id })

    if (workspace.isLeft()) {
      return left(new InvalidParameterError(workspace.value))
    }

    await this.workspacesRepository.save(workspace.value)

    const member = createMember({
      agent_id: requester_id,
      workspace_id: workspace.value.id.value,
      is_admin: true
    })

    return right(workspace.value)
  }
}
