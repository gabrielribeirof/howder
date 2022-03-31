import { AssignMemberToChatService } from '../assign-member-to-chat.service'

import { InMemoryChatsRepository } from '@modules/chats/repositories/in-memory/in-memory-chats.repository'
import { InMemoryMembersRespository } from '@modules/workspaces/repositories/in-memory/in-memory-members.repository'

import { ChatAlreadyHasMemberAssignedError } from '@shared/errors/chat-already-has-member-assigned.error'

import { makeChat } from '@test/makers/chat.maker'
import { makeMember } from '@test/makers/member.maker'

let chatsRepository: InMemoryChatsRepository
let membersRespository: InMemoryMembersRespository
let sut: AssignMemberToChatService

describe('AssignMemberToChatService', () => {
  beforeEach(() => {
    chatsRepository = new InMemoryChatsRepository()
    membersRespository = new InMemoryMembersRespository()

    sut = new AssignMemberToChatService(chatsRepository, membersRespository)
  })

  it('should assign a workspace member to a chat', async () => {
    const chat = makeChat()
    const member = makeMember({
      agent_id: 'agent-id',
      workspace_id: chat.workspace_id.value
    })

    await chatsRepository.save(chat)
    await membersRespository.save(member)

    const response = await sut.execute({
      chat_id: chat.id.value,
      requester_id: 'agent-id'
    })

    expect(response.isRight()).toBeTruthy()
    expect((await chatsRepository.findById(chat.id.value))?.member_id?.equals(member.id)).toBeTruthy()
  })

  it('should not assign a non-workspace member to a chat', async () => {
    const chat = makeChat()
    const member = makeMember({
      agent_id: 'agent-id',
      workspace_id: 'other-workspac-id'
    })

    await chatsRepository.save(chat)
    await membersRespository.save(member)

    const response = await sut.execute({
      chat_id: chat.id.value,
      requester_id: 'agent-id'
    })

    expect(response.isLeft()).toBeTruthy()
    expect((await chatsRepository.findById(chat.id.value))?.member_id?.equals(member.id)).toBeFalsy()
  })

  it('should not assign a member to a chat that already has a member assigned', async () => {
    const chat = makeChat()
    const member = makeMember({
      agent_id: 'agent-id',
      workspace_id: chat.workspace_id.value
    })

    await chatsRepository.save(chat)
    await membersRespository.save(member)

    await sut.execute({
      chat_id: chat.id.value,
      requester_id: 'agent-id'
    })

    const response = await sut.execute({
      chat_id: chat.id.value,
      requester_id: 'agent-id'
    })

    expect(response.isLeft()).toBeTruthy()
    expect(response.value).toBeInstanceOf(ChatAlreadyHasMemberAssignedError)
  })
})
