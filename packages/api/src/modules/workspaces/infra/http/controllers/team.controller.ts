import { container } from 'tsyringe'
import { Request, Response } from 'express'
import { ok } from '@shared/utils/http-response.utils'

import { CreateTeamService } from '@modules/workspaces/services/create-team.service'
import { UpdateTeamService } from '@modules/workspaces/services/update-team.service'
import { DeleteTeamService } from '@modules/workspaces/services/delete-team.service'

export class TeamController {
  public async store(request: Request, response: Response): Promise<void> {
    const { workspace_id, name } = request.body
    const { subject } = request.token_payload

    const service = container.resolve(CreateTeamService)

    ok.either(response, await service.execute({
      workspace_id,
      name,
      requester_id: subject
    }))
  }

  public async update(request: Request, response: Response): Promise<void> {
    const { name } = request.body
    const { team_id } = request.params
    const { subject } = request.token_payload

    const service = container.resolve(UpdateTeamService)

    ok.either(response, await service.execute({
      team_id,
      name,
      requester_id: subject
    }))
  }

  public async destroy(request: Request, response: Response): Promise<void> {
    const { team_id } = request.params
    const { subject } = request.token_payload

    const service = container.resolve(DeleteTeamService)

    ok.either(response, await service.execute({
      team_id,
      requester_id: subject
    }))
  }
}
