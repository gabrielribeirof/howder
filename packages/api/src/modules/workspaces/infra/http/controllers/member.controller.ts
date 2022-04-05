import { container } from 'tsyringe'
import { Request, Response } from 'express'
import { ok } from '@shared/utils/http-response.utils'

import { CreateMemberService } from '@modules/workspaces/services/create-member.service'
import { DeleteMemberService } from '@modules/workspaces/services/delete-member.service'

export class MemberController {
  public async store(request: Request, response: Response): Promise<void> {
    const { workspace_id, email } = request.body
    const { subject } = request.token_payload

    const service = container.resolve(CreateMemberService)

    ok.either(response, await service.execute({
      workspace_id,
      email,
      requester_id: subject
    }))
  }

  public async destroy(request: Request, response: Response): Promise<void> {
    const { member_id } = request.params
    const { subject } = request.token_payload

    const service = container.resolve(DeleteMemberService)

    ok.either(response, await service.execute({
      member_id,
      requester_id: subject
    }))
  }
}
