import { injectable, inject } from 'tsyringe'
import { AppError } from '@shared/core/errors/app-error'
import { Either, right, left } from '@shared/core/logic/either'

import { IWorkspacesRespository } from '../repositories/iworkspaces.repository'

import { InvalidParameterError } from '@shared/errors/invalid-parameter.error'
import { UnknownChatError } from '@shared/errors/unknown-chat.error'
import { UnauthorizedError } from '@shared/errors/unauthorized.error'

import { Workspace } from '../domain/workspace/workspace'
import { Name } from '@shared/domain/name'

type UpdateWorkspaceRequest = {
  workspace_id: string
  name: string
  requester_id: string
}

@injectable()
export class UpdateWorkspaceService {
  constructor(
    @inject('WorkspacesRespository')
    private workspaceRepository: IWorkspacesRespository
  ) {}

  public async execute({
    workspace_id,
    name,
    requester_id
  }: UpdateWorkspaceRequest): Promise<Either<AppError, Workspace>> {
    const workspace = await this.workspaceRepository.findById(workspace_id)

    if (!workspace) {
      return left(new UnknownChatError())
    }

    if (workspace.creator_id.value !== requester_id) {
      return left(new UnauthorizedError())
    }

    const nameResult = Name.create({ value: name })

    if (nameResult.isLeft()) {
      return left(new InvalidParameterError([nameResult.value]))
    }

    workspace.name = nameResult.value

    await this.workspaceRepository.save(workspace)

    return right(workspace)
  }
}
