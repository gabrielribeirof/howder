import { ListChatsService } from '../list-chats.service'

import { InMemoryChatsRepository } from '@modules/chats/repositories/in-memory/in-memory-chats.repository'
import { InMemoryMembersRespository } from '@modules/workspaces/repositories/in-memory/in-memory-members.repository'

import { UnauthorizedError } from '@shared/errors/unauthorized.error'

import { Chat } from '@modules/chats/domain/chat/chat'
import { makeMember } from '@test/helpers/makers/member.maker'
import { makeChat } from '@test/helpers/makers/chat.maker'

let chatsRepository: InMemoryChatsRepository
let membersRepository: InMemoryMembersRespository

let sut: ListChatsService

describe('ListChatsService', () => {
  beforeEach(() => {
    chatsRepository = new InMemoryChatsRepository()
    membersRepository = new InMemoryMembersRespository()

    sut = new ListChatsService(chatsRepository, membersRepository)
  })

  it('should get the requester workspace chats', async () => {
    const member = makeMember({ workspace_id: 'workspace-id' })
    const chat1 = makeChat({ workspace_id: 'workspace-id' })
    const chat2 = makeChat({ workspace_id: 'workspace-id' })
    const chat3 = makeChat({ workspace_id: 'workspace-id' })

    await membersRepository.save(member)
    await chatsRepository.save(chat1)
    await chatsRepository.save(chat2)
    await chatsRepository.save(chat3)

    const response = await sut.execute({
      workspace_id: 'workspace-id',
      requester_id: member.agent_id.value
    })

    expect(response.isRight()).toBeTruthy()
    expect(response.isRight() && response.value.length).toBe(3)
    expect(response.isRight() && response.value[0]).toBeInstanceOf(Chat)
  })

  it('should not get workspace users for an outside workspace member', async () => {
    const member = makeMember({ workspace_id: 'other-workspace-id' })
    const chat1 = makeChat({ workspace_id: 'workspace-id' })
    const chat2 = makeChat({ workspace_id: 'workspace-id' })
    const chat3 = makeChat({ workspace_id: 'workspace-id' })

    await membersRepository.save(member)
    await chatsRepository.save(chat1)
    await chatsRepository.save(chat2)
    await chatsRepository.save(chat3)

    const response = await sut.execute({
      workspace_id: 'workspace-id',
      requester_id: member.agent_id.value
    })

    expect(response.isRight()).toBeFalsy()
    expect(response.value).toBeInstanceOf(UnauthorizedError)
  })
})
