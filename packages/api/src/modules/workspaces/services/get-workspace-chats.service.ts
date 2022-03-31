import { AppError } from '@shared/core/errors/app-error'
import { Either, right, left } from '@shared/core/logic/either'

import { IChatsRepository } from '@modules/chats/repositories/ichats.repository'
import { IMembersRepository } from '../repositories/imembers.repository'

import { InvalidParameterError } from '@shared/errors/invalid-parameter.error'
import { UnauthorizedError } from '@shared/errors/unauthorized.error'
import { BadLengthViolation } from '@shared/errors/violations/bad-length.violation'
import { MinLengthViolation } from '@shared/errors/violations/min-length.violation'

import { Chat } from '@modules/chats/domain/chat/chat'

type GetWorkspaceChatsRequest = {
  workspace_id: string
  is_open?: boolean
  count?: number
  page?: number
  requester_id: string
}

export class GetWorkspaceChatsService {
  constructor(
    private chatsRepository: IChatsRepository,
    private membersRepository: IMembersRepository
  ) {}

  public async execute({
    workspace_id,
    is_open,
    count,
    page,
    requester_id
  }: GetWorkspaceChatsRequest): Promise<Either<AppError, Chat[]>> {
    const member = await this.membersRepository.findByWorkspaceIdAndAgentId(workspace_id, requester_id)

    if (!member) {
      return left(new UnauthorizedError())
    }

    if (count && (count > 50 || count < 0)) {
      return left(new InvalidParameterError([
        new BadLengthViolation('count', String(count), 1, 50)
      ]))
    }

    if (page && page < 0) {
      return left(new InvalidParameterError([
        new MinLengthViolation('page', String(page), 1)
      ]))
    }

    const finalCount = count || 10
    const finalPage = page || 1

    const chats = await this.chatsRepository
      .findByWorkspaceId(workspace_id, finalCount, finalPage, is_open)

    return right(chats || [])
  }
}
