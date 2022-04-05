import { container } from 'tsyringe'
import { Request, Response } from 'express'
import { ok } from '@shared/utils/http-response.utils'

import { AddMemberToTeamService } from '@modules/workspaces/services/add-member-to-team.service'
import { RemoveMemberFromTeamService } from '@modules/workspaces/services/remove-member-from-team.service'

export class TeamMemberController {
  public async store(request: Request, response: Response): Promise<void> {
    const { team_id, member_id } = request.params
    const { subject } = request.token_payload

    const service = container.resolve(AddMemberToTeamService)

    ok.either(response, await service.execute({
      member_id,
      team_id,
      requester_id: subject
    }))
  }

  public async destroy(request: Request, response: Response): Promise<void> {
    const { team_id, member_id } = request.params
    const { subject } = request.token_payload

    const service = container.resolve(RemoveMemberFromTeamService)

    ok.either(response, await service.execute({
      member_id,
      team_id,
      requester_id: subject
    }))
  }
}
