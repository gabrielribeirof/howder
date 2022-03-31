import { OpenChatService } from '../open-chat.service'

import { InMemoryChatsRepository } from '../../repositories/in-memory/in-memory-chats.repository'
import { InMemoryMembersRespository } from '@modules/workspaces/repositories/in-memory/in-memory-members.repository'

import { UnauthorizedError } from '@shared/errors/unauthorized.error'

import { makeMember } from '@test/makers/member.maker'
import { makeChat } from '@test/makers/chat.maker'

let chatsRepository: InMemoryChatsRepository
let membersRespository: InMemoryMembersRespository
let sut: OpenChatService

describe('OpenChatService', () => {
  beforeEach(() => {
    chatsRepository = new InMemoryChatsRepository()
    membersRespository = new InMemoryMembersRespository()

    sut = new OpenChatService(chatsRepository, membersRespository)
  })

  it('should allow the chat assigned member to open the chat', async () => {
    const member = makeMember()
    const chat = makeChat({
      member_id: member.id.value,
      is_open: false
    })

    await chatsRepository.save(chat)
    await membersRespository.save(member)

    const response = await sut.execute({
      chat_id: chat.id.value,
      requester_id: member.agent_id.value
    })

    expect(response.value).toBeNull()
    expect((await chatsRepository.findById(chat.id.value))?.is_open).toBeTruthy()
  })

  it('should not allow a chat non-assigned member to open the chat', async () => {
    const member = makeMember()
    const chat = makeChat({
      member_id: 'other-member-id',
      is_open: false
    })

    await chatsRepository.save(chat)
    await membersRespository.save(member)

    const response = await sut.execute({
      chat_id: chat.id.value,
      requester_id: member.agent_id.value
    })

    expect(response.value).toBeInstanceOf(UnauthorizedError)
    expect((await chatsRepository.findById(chat.id.value))?.is_open).toBeFalsy()
  })
})
