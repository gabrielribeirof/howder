import { UnassignMemberFromChatService } from '../unassign-member-from-chat.service'

import { InMemoryChatsRepository } from '@modules/chats/repositories/in-memory/in-memory-chats.repository'
import { InMemoryMembersRespository } from '@modules/workspaces/repositories/in-memory/in-memory-members.repository'

import { ChatHasNoMemberAssignedError } from '@shared/errors/chat-has-no-member-assigned.error'
import { UnauthorizedError } from '@shared/errors/unauthorized.error'

import { makeChat } from '@test/helpers/makers/chat.maker'
import { makeMember } from '@test/helpers/makers/member.maker'

let chatsRepository: InMemoryChatsRepository
let membersRespository: InMemoryMembersRespository
let sut: UnassignMemberFromChatService

describe('UnassignMemberFromChatService', () => {
  beforeEach(() => {
    chatsRepository = new InMemoryChatsRepository()
    membersRespository = new InMemoryMembersRespository()

    sut = new UnassignMemberFromChatService(chatsRepository, membersRespository)
  })

  it('should unassign a workspace member from a chat', async () => {
    const chat = makeChat()
    const member = makeMember({
      agent_id: 'agent-id',
      workspace_id: chat.workspace_id.value
    })

    chat.assignMember(member)

    await chatsRepository.save(chat)
    await membersRespository.save(member)

    const response = await sut.execute({
      chat_id: chat.id.value,
      requester_id: 'agent-id'
    })

    expect(response.value).toBeNull()
    expect((await chatsRepository.findById(chat.id.value))?.member_id).toBeUndefined()
  })

  it('should not unassign a non-workspace member from a chat', async () => {
    const chat = makeChat()
    const member = makeMember({
      agent_id: 'agent-id',
      workspace_id: 'other-workspac-id'
    })

    chat.assignMember(member)

    await chatsRepository.save(chat)
    await membersRespository.save(member)

    const response = await sut.execute({
      chat_id: chat.id.value,
      requester_id: 'agent-id'
    })

    expect(response.value).toBeInstanceOf(UnauthorizedError)
    expect((await chatsRepository.findById(chat.id.value))?.member_id).toBeTruthy()
  })

  it('should not unassign a member from a chat that has no member assigned', async () => {
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

    expect(response.value).toBeInstanceOf(ChatHasNoMemberAssignedError)
    expect((await chatsRepository.findById(chat.id.value))?.member_id).toBeUndefined()
  })
})
