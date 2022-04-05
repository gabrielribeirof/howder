import { injectable, inject } from 'tsyringe'
import { AppError } from '@shared/core/errors/app-error'
import { Either, right, left } from '@shared/core/logic/either'

import { ITagsRepository } from '../repositories/itags.repository'
import { IMembersRepository } from '@modules/workspaces/repositories/imembers.repository'

import { InvalidParameterError } from '@shared/errors/invalid-parameter.error'
import { UnauthorizedError } from '@shared/errors/unauthorized.error'

import { Tag } from '../domain/tag/tag'
import { createTag } from '../domain/tag/factories/tag.factory'

type CreateTagRequest = {
  workspace_id: string
  name: string
  requester_id: string
}

@injectable()
export class CreateTagService {
  constructor(
    @inject('TagsRepository')
    private tagsRepository: ITagsRepository,
    @inject('MembersRepository')
    private membersRepository: IMembersRepository
  ) {}

  public async execute({
    workspace_id,
    name,
    requester_id
  }: CreateTagRequest): Promise<Either<AppError, Tag>> {
    const creatorMember = await this.membersRepository.findByWorkspaceIdAndAgentId(workspace_id, requester_id)

    if (!creatorMember || !creatorMember.is_admin) {
      return left(new UnauthorizedError())
    }

    const tag = createTag({
      name,
      creator_id: creatorMember.id.value,
      workspace_id
    })

    if (tag.isLeft()) {
      return left(new InvalidParameterError(tag.value))
    }

    await this.tagsRepository.save(tag.value)

    return right(tag.value)
  }
}
