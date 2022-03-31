import { RemoveTagFromChatService } from '../remove-tag-from-chat.service'

import { InMemoryChatsRepository } from '../../repositories/in-memory/in-memory-chats.repository'
import { InMemoryTagsRepository } from '../../repositories/in-memory/in-memory-tags.repository'
import { InMemoryMembersRespository } from '@modules/workspaces/repositories/in-memory/in-memory-members.repository'

import { UnauthorizedError } from '@shared/errors/unauthorized.error'
import { NotFoundError } from '@shared/errors/not-found.error'

import { ChatTag } from '@modules/chats/domain/chat/chat-tag'
import { makeChat } from '@test/makers/chat.maker'
import { makeTag } from '@test/makers/tag.maker'
import { makeMember } from '@test/makers/member.maker'

let chatsRepository: InMemoryChatsRepository
let tagsRepository: InMemoryTagsRepository
let membersRepository: InMemoryMembersRespository
let sut: RemoveTagFromChatService

describe('RemoveTagFromChatService', () => {
  beforeEach(() => {
    chatsRepository = new InMemoryChatsRepository()
    tagsRepository = new InMemoryTagsRepository()
    membersRepository = new InMemoryMembersRespository()

    sut = new RemoveTagFromChatService(
      chatsRepository,
      tagsRepository,
      membersRepository
    )
  })

  it('should allow the chat assigned member to remove a tag from the chat', async () => {
    const member = makeMember()
    const chat = makeChat({ member_id: member.id.value })
    const tag = makeTag()

    chat.addTag(ChatTag.create({ tag_id: tag.id }))

    await membersRepository.save(member)
    await chatsRepository.save(chat)
    await tagsRepository.save(tag)

    const response = await sut.execute({
      chat_id: chat.id.value,
      tag_id: tag.id.value,
      requester_id: member.agent_id.value
    })

    expect(response.value).toBeNull()
    expect(chatsRepository.chats[0].tags.getItems().length).toBe(0)
  })

  it('should not allow a chat non-assigned member to remove a tag from the chat', async () => {
    const member = makeMember()
    const chat = makeChat({ member_id: 'other-member-id' })
    const tag = makeTag()

    chat.addTag(ChatTag.create({ tag_id: tag.id }))

    await membersRepository.save(member)
    await chatsRepository.save(chat)
    await tagsRepository.save(tag)

    const response = await sut.execute({
      chat_id: chat.id.value,
      tag_id: tag.id.value,
      requester_id: member.agent_id.value
    })

    expect(response.value).toBeInstanceOf(UnauthorizedError)
    expect(chatsRepository.chats[0].tags.getItems().length).toBe(1)
  })

  it('should allow a chat workspace admin member to remove a tag from the chat', async () => {
    const member = makeMember({ is_admin: true })
    const chat = makeChat({ member_id: 'other-member-id' })
    const tag = makeTag()

    chat.addTag(ChatTag.create({ tag_id: tag.id }))

    await membersRepository.save(member)
    await chatsRepository.save(chat)
    await tagsRepository.save(tag)

    const response = await sut.execute({
      chat_id: chat.id.value,
      tag_id: tag.id.value,
      requester_id: member.agent_id.value
    })

    expect(response.value).toBeNull()
    expect(chatsRepository.chats[0].tags.getItems().length).toBe(0)
  })

  it('should not remove a tag from the chat if tag is not added', async () => {
    const member = makeMember()
    const chat = makeChat({ member_id: member.id.value })
    const tag = makeTag()

    await membersRepository.save(member)
    await chatsRepository.save(chat)
    await tagsRepository.save(tag)

    await sut.execute({
      chat_id: chat.id.value,
      tag_id: tag.id.value,
      requester_id: member.agent_id.value
    })

    const response = await sut.execute({
      chat_id: chat.id.value,
      tag_id: tag.id.value,
      requester_id: member.agent_id.value
    })

    expect(response.value).toBeInstanceOf(NotFoundError)
    expect(chatsRepository.chats[0].tags.getItems().length).toBe(0)
  })
})
