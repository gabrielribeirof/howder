import { injectable, inject } from 'tsyringe'
import { AppError } from '@shared/core/errors/app-error'
import { Either, right, left } from '@shared/core/logic/either'

import { IWorkspacesRespository } from '../repositories/iworkspaces.repository'
import { IMembersRepository } from '../repositories/imembers.repository'

import { InvalidParameterError } from '@shared/errors/invalid-parameter.error'

import { Workspace } from '../domain/workspace/workspace'
import { createWorkspace } from '../domain/workspace/factories/workspace.factory'
import { createMember } from '../domain/member/factories/member.factory'

type CreateWorkspaceRequest = {
  name: string
  requester_id: string
}

@injectable()
export class CreateWorkspaceService {
  constructor(
    @inject('WorkspacesRespository')
    private workspacesRepository: IWorkspacesRespository,
    @inject('MembersRepository')
    private membersRepository: IMembersRepository
  ) {}

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

    if (member.isLeft()) {
      await this.workspacesRepository.delete(workspace.value)
      return left(new InvalidParameterError(member.value))
    }

    await this.membersRepository.save(member.value)

    return right(workspace.value)
  }
}
