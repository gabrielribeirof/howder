import { container } from 'tsyringe'
import { Request, Response } from 'express'
import { ok, fail } from '@shared/utils/http-response.utils'

import { MemberMapper } from '@modules/workspaces/mappers/member.mapper'

import { CreateMemberService } from '@modules/workspaces/services/create-member.service'
import { DeleteMemberService } from '@modules/workspaces/services/delete-member.service'

export class MemberController {
  public async store(request: Request, response: Response): Promise<void> {
    const { workspace_id, email } = request.body
    const { subject } = request.token_payload

    const service = container.resolve(CreateMemberService)

    const result = await service.execute({
      workspace_id,
      email,
      requester_id: subject
    })

    if (result.isRight()) {
      ok(response, MemberMapper.toDTO(result.value))
    } else {
      fail(response, result.value)
    }
  }

  public async destroy(request: Request, response: Response): Promise<void> {
    const { member_id } = request.params
    const { subject } = request.token_payload

    const service = container.resolve(DeleteMemberService)

    const result = await service.execute({
      member_id,
      requester_id: subject
    })

    if (result.isRight()) {
      ok(response)
    } else {
      fail(response, result.value)
    }
  }
}
