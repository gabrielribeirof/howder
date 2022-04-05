import { container } from 'tsyringe'
import { Request, Response } from 'express'
import { ok } from '@shared/utils/http-response.utils'

import { ListWorkspacesService } from '@modules/workspaces/services/list-workspaces.service'
import { GetWorkspaceService } from '@modules/workspaces/services/get-workspace.service'
import { CreateWorkspaceService } from '@modules/workspaces/services/create-workspace.service'
import { UpdateWorkspaceService } from '@modules/workspaces/services/update-workspace.service'
import { DeleteWorkspaceService } from '@modules/workspaces/services/delete-workspace.service'

export class WorkspaceController {
  public async index(request: Request, response: Response): Promise<void> {
    const { subject } = request.token_payload

    const service = container.resolve(ListWorkspacesService)

    ok.either(response, await service.execute({
      requester_id: subject
    }))
  }

  public async show(request: Request, response: Response): Promise<void> {
    const { workspace_id } = request.params
    const { subject } = request.token_payload

    const service = container.resolve(GetWorkspaceService)

    ok.either(response, await service.execute({
      workspace_id,
      requester_id: subject
    }))
  }

  public async store(request: Request, response: Response): Promise<void> {
    const { name } = request.body
    const { subject } = request.token_payload

    const service = container.resolve(CreateWorkspaceService)

    ok.either(response, await service.execute({
      name,
      requester_id: subject
    }))
  }

  public async update(request: Request, response: Response): Promise<void> {
    const { name } = request.body
    const { workspace_id } = request.params
    const { subject } = request.token_payload

    const service = container.resolve(UpdateWorkspaceService)

    ok.either(response, await service.execute({
      workspace_id,
      name,
      requester_id: subject
    }))
  }

  public async destroy(request: Request, response: Response): Promise<void> {
    const { workspace_id } = request.params
    const { subject } = request.token_payload

    const service = container.resolve(DeleteWorkspaceService)

    ok.either(response, await service.execute({
      workspace_id,
      requester_id: subject
    }))
  }
}
