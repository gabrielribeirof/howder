import { injectable, inject } from 'tsyringe'
import { AppError } from '@shared/core/errors/app-error'
import { Either, right, left } from '@shared/core/logic/either'

import { ITagsRepository } from '../repositories/itags.repository'
import { IMembersRepository } from '@modules/workspaces/repositories/imembers.repository'

import { UnknownTagError } from '@shared/errors/unknown-tag.error'
import { UnauthorizedError } from '@shared/errors/unauthorized.error'

type DeleteTagRequest = {
  tag_id: string
  requester_id: string
}

@injectable()
export class DeleteTagService {
  constructor(
    @inject('TagsRepository')
    private tagsRepository: ITagsRepository,
    @inject('MembersRepository')
    private membersRepository: IMembersRepository
  ) {}

  public async execute({
    tag_id,
    requester_id
  }: DeleteTagRequest): Promise<Either<AppError, null>> {
    const tag = await this.tagsRepository.findById(tag_id)

    if (!tag) {
      return left(new UnknownTagError())
    }

    const workspace_id = tag.workspace_id.value

    const requesterMember = await this.membersRepository.findByWorkspaceIdAndAgentId(workspace_id, requester_id)

    if (!requesterMember || !requesterMember.is_admin) {
      return left(new UnauthorizedError())
    }

    await this.tagsRepository.delete(tag)

    return right(null)
  }
}
