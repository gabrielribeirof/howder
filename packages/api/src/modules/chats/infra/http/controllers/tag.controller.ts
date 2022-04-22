import { container } from 'tsyringe'
import { Request, Response } from 'express'
import { ok, fail } from '@shared/utils/http-response.utils'

import { TagMapper } from '@modules/chats/mappers/tag.mapper'

import { CreateTagService } from '@modules/chats/services/create-tag.service'
import { UpdateTagService } from '@modules/chats/services/update-tag.service'
import { DeleteTagService } from '@modules/chats/services/delete-tag.service'

export class TagController {
  public async store(request: Request, response: Response): Promise<void> {
    const { workspace_id, name } = request.body
    const { subject } = request.token_payload

    const service = container.resolve(CreateTagService)

    const result = await service.execute({
      workspace_id,
      name,
      requester_id: subject
    })

    if (result.isRight()) {
      ok(response, TagMapper.toDTO(result.value))
    } else {
      fail(response, result.value)
    }
  }

  public async update(request: Request, response: Response): Promise<void> {
    const { name } = request.body
    const { tag_id } = request.params
    const { subject } = request.token_payload

    const service = container.resolve(UpdateTagService)

    const result = await service.execute({
      tag_id,
      name,
      requester_id: subject
    })

    if (result.isRight()) {
      ok(response, TagMapper.toDTO(result.value))
    } else {
      fail(response, result.value)
    }
  }

  public async destroy(request: Request, response: Response): Promise<void> {
    const { tag_id } = request.params
    const { subject } = request.token_payload

    const service = container.resolve(DeleteTagService)

    const result = await service.execute({
      tag_id,
      requester_id: subject
    })

    if (result.isRight()) {
      ok(response)
    } else {
      fail(response, result.value)
    }
  }
}
