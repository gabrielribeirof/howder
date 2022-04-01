import { injectable, inject } from 'tsyringe'
import { AppError } from '@shared/core/errors/app-error'
import { Either, right, left } from '@shared/core/logic/either'

import { ITagsRepository } from '../repositories/itags.repository'
import { IMembersRepository } from '@modules/workspaces/repositories/imembers.repository'

import { InvalidParameterError } from '@shared/errors/invalid-parameter.error'
import { UnknownTagError } from '@shared/errors/unknown-tag.error'
import { UnauthorizedError } from '@shared/errors/unauthorized.error'

import { Tag } from '../domain/tag/tag'
import { Name } from '@shared/domain/name'

type UpdateTagRequest = {
  name: string
  tag_id: string
  requester_id: string
}

@injectable()
export class UpdateTagService {
  constructor(
    @inject('TagsRepository')
    private tagsRepository: ITagsRepository,
    @inject('MembersRepository')
    private membersRepository: IMembersRepository
  ) {}

  public async execute({
    name,
    tag_id,
    requester_id
  }: UpdateTagRequest): Promise<Either<AppError, Tag>> {
    const tag = await this.tagsRepository.findById(tag_id)

    if (!tag) {
      return left(new UnknownTagError())
    }

    const workspace_id = tag.workspace_id.value

    const requesterMember = await this.membersRepository
      .findByWorkspaceIdAndAgentId(workspace_id, requester_id)

    if (!requesterMember || !requesterMember.is_admin) {
      return left(new UnauthorizedError())
    }

    const nameResult = Name.create({ value: name })

    if (nameResult.isLeft()) {
      return left(new InvalidParameterError([nameResult.value]))
    }

    tag.name = nameResult.value

    await this.tagsRepository.save(tag)

    return right(tag)
  }
}
