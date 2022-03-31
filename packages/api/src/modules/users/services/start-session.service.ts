import { AppError } from '@shared/core/errors/app-error'
import { Either, right, left } from '@shared/core/logic/either'

import { IUsersRepository } from '@modules/users/repositories/iusers.repository'
import { IChatsRepository } from '@modules/chats/repositories/ichats.repository'
import { IWorkspacesRespository } from '@modules/workspaces/repositories/iworkspaces.repository'
import { ITokenProvider } from '@shared/providers/token/itoken-provider'

import { InvalidParameterError } from '@shared/errors/invalid-parameter.error'
import { UnknownWorkspaceError } from '@shared/errors/unknown-workspace.error'

import { User } from '../domain/user/user'
import { Chat } from '@modules/chats/domain/chat/chat'
import { createUser } from '@modules/users/domain/user/factories/user.factory'
import { createChat } from '@modules/chats/domain/chat/factories/chat.factory'

type StartSessionRequest = {
  name: string
  email: string
  workspace_id: string
}

type StartSessionResponse = {
  user: User
  chat: Chat
  token: string
}

export class StartSessionService {
  constructor(
    private usersRepository: IUsersRepository,
    private chatsRepository: IChatsRepository,
    private workspacesRepository: IWorkspacesRespository,
    private tokenProvider: ITokenProvider
  ) {}

  public async execute({
    name,
    email,
    workspace_id
  }: StartSessionRequest): Promise<Either<AppError, StartSessionResponse>> {
    const workspace = await this.workspacesRepository.findById(workspace_id)

    if (!workspace) {
      return left(new UnknownWorkspaceError())
    }

    const user = createUser({ name, email, workspace_id })

    if (user.isLeft()) {
      return left(new InvalidParameterError(user.value))
    }

    const chat = createChat({ user_id: user.value.id.value, workspace_id })

    if (chat.isLeft()) {
      return left(new InvalidParameterError(chat.value))
    }

    await this.usersRepository.save(user.value)
    await this.chatsRepository.save(chat.value)

    const token = this.tokenProvider.signUserToken(user.value)

    return right({
      user: user.value,
      chat: chat.value,
      token
    })
  }
}
