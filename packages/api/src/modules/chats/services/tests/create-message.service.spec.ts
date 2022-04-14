import { CreateMessageService } from '../create-message.service'

import { InMemoryMessagesRespository } from '../../repositories/in-memory/in-memory-messages.repository'
import { InMemoryChatsRepository } from '@modules/chats/repositories/in-memory/in-memory-chats.repository'

import { UnauthorizedError } from '@shared/errors/unauthorized.error'

import { makeChat } from '@test/helpers/makers/chat.maker'

let messagesRespository: InMemoryMessagesRespository
let chatsRepository: InMemoryChatsRepository
let sut: CreateMessageService

describe('CreateMessageService', () => {
  beforeEach(() => {
    messagesRespository = new InMemoryMessagesRespository()
    chatsRepository = new InMemoryChatsRepository()

    sut = new CreateMessageService(messagesRespository, chatsRepository)
  })

  it('should allow the chat user to create a message on it', async () => {
    const chat = makeChat({
      workspace_id: 'workspace-id',
      user_id: 'user-id'
    })
    await chatsRepository.save(chat)

    const response = await sut.execute({
      chat_id: chat.id.value,
      content: 'Testing',
      requester_id: 'user-id',
      requester_type: 'user'
    })

    expect(response.isRight()).toBeTruthy()
    expect(messagesRespository.messages.length).toBe(1)
  })

  it('should not allow a user who is not assigned to the chat to create a message on it', async () => {
    const chat = makeChat({
      workspace_id: 'workspace-id',
      user_id: 'user-id'
    })
    await chatsRepository.save(chat)

    const response = await sut.execute({
      chat_id: chat.id.value,
      content: 'Testing',
      requester_id: 'unassigned-user-id',
      requester_type: 'user'
    })

    expect(response.value).toBeInstanceOf(UnauthorizedError)
    expect(messagesRespository.messages.length).toBe(0)
  })

  it('should allow the member assigned to the chat to create a message on it', async () => {
    const chat = makeChat({
      user_id: 'user-id',
      member_id: 'member-id'
    })
    await chatsRepository.save(chat)

    const response = await sut.execute({
      chat_id: chat.id.value,
      content: 'Testing',
      requester_id: 'member-id',
      requester_type: 'member'
    })

    expect(response.isRight()).toBeTruthy()
    expect(messagesRespository.messages.length).toBe(1)
  })

  it('should not allow an member not assigned to the chat to create a message on it', async () => {
    const chat = makeChat({
      user_id: 'user-id',
      member_id: 'member-id'
    })
    await chatsRepository.save(chat)

    const response = await sut.execute({
      chat_id: chat.id.value,
      content: 'Testing',
      requester_id: 'unassigned-member-id',
      requester_type: 'member'
    })

    expect(response.value).toBeInstanceOf(UnauthorizedError)
    expect(messagesRespository.messages.length).toBe(0)
  })
})
