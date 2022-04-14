import { StartSessionService } from './start-session.service'

import { InMemoryUsersRepository } from '../repositories/in-memory/in-memory-users.repository'
import { InMemoryChatsRepository } from '@modules/chats/repositories/in-memory/in-memory-chats.repository'
import { InMemoryWorkspacesRepository } from '@modules/workspaces/repositories/in-memory/in-memory-workspaces.repository'
import { TokenProvider } from '@shared/providers/token/implementations/token-provider'

import { InvalidParameterError } from '@shared/errors/invalid-parameter.error'
import { UnknownWorkspaceError } from '@shared/errors/unknown-workspace.error'

import { makeWorkspace } from '@test/helpers/makers/workspace.maker'
import { makeAgent } from '@test/helpers/makers/agent.maker'

let usersRepository: InMemoryUsersRepository
let chatsRepository: InMemoryChatsRepository
let workspacesRepository: InMemoryWorkspacesRepository
let tokenProvider: TokenProvider
let sut: StartSessionService

describe('StartSessionService', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    chatsRepository = new InMemoryChatsRepository()
    workspacesRepository = new InMemoryWorkspacesRepository()
    tokenProvider = new TokenProvider()

    sut = new StartSessionService(
      usersRepository,
      chatsRepository,
      workspacesRepository,
      tokenProvider
    )
  })

  it('should start a session', async () => {
    const workspace = makeWorkspace()
    await workspacesRepository.save(workspace)

    const response = await sut.execute({
      name: 'Joe Doe',
      email: 'joedoe@example.com',
      workspace_id: workspace.id.value
    })

    expect(response.isRight()).toBeTruthy()
    expect(usersRepository.users.length).toBe(1)
    expect(chatsRepository.chats.length).toBe(1)
  })

  it('should not start a session with invalid data', async () => {
    const workspace = makeWorkspace()
    await workspacesRepository.save(workspace)

    const response = await sut.execute({
      name: 'J',
      email: 'joedoe@',
      workspace_id: workspace.id.value
    })

    expect(response.value).toBeInstanceOf(InvalidParameterError)
    expect(usersRepository.users.length).toBe(0)
    expect(chatsRepository.chats.length).toBe(0)
  })

  it('should not start a session in a workspace that not exists', async () => {
    const response = await sut.execute({
      name: 'Joe Doe',
      email: 'joedoe@example.com',
      workspace_id: 'no-existing-workspace-id'
    })

    expect(response.value).toBeInstanceOf(UnknownWorkspaceError)
  })
})
