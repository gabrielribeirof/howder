import { AddTagToChatService } from '../add-tag-to-chat.service'

import { InMemoryChatsRepository } from '../../repositories/in-memory/in-memory-chats.repository'
import { InMemoryTagsRepository } from '../../repositories/in-memory/in-memory-tags.repository'
import { InMemoryMembersRespository } from '@modules/workspaces/repositories/in-memory/in-memory-members.repository'

import { UnauthorizedError } from '@shared/errors/unauthorized.error'
import { AlreadyExistsError } from '@shared/errors/already-exists.error'

import { makeChat } from '@test/helpers/makers/chat.maker'
import { makeTag } from '@test/helpers/makers/tag.maker'
import { makeMember } from '@test/helpers/makers/member.maker'

let chatsRepository: InMemoryChatsRepository
let tagsRepository: InMemoryTagsRepository
let membersRepository: InMemoryMembersRespository
let sut: AddTagToChatService

describe('AddTagToChatService', () => {
  beforeEach(() => {
    chatsRepository = new InMemoryChatsRepository()
    tagsRepository = new InMemoryTagsRepository()
    membersRepository = new InMemoryMembersRespository()

    sut = new AddTagToChatService(
      chatsRepository,
      tagsRepository,
      membersRepository
    )
  })

  it('should allow the chat assigned member to add a tag to the chat', async () => {
    const member = makeMember()
    const chat = makeChat({ member_id: member.id.value })
    const tag = makeTag()

    await membersRepository.save(member)
    await chatsRepository.save(chat)
    await tagsRepository.save(tag)

    const response = await sut.execute({
      chat_id: chat.id.value,
      tag_id: tag.id.value,
      requester_id: member.agent_id.value
    })

    expect(response.value).toBeNull()
    expect(chatsRepository.chats[0].tags.getItems().length).toBe(1)
  })

  it('should not allow a chat non-assigned member to add a tag to the chat', async () => {
    const member = makeMember()
    const chat = makeChat({ member_id: 'other-member-id' })
    const tag = makeTag()

    await membersRepository.save(member)
    await chatsRepository.save(chat)
    await tagsRepository.save(tag)

    const response = await sut.execute({
      chat_id: chat.id.value,
      tag_id: tag.id.value,
      requester_id: member.agent_id.value
    })

    expect(response.value).toBeInstanceOf(UnauthorizedError)
    expect(chatsRepository.chats[0].tags.getItems().length).toBe(0)
  })

  it('should allow a chat workspace admin member to add a tag to the chat', async () => {
    const member = makeMember({ is_admin: true })
    const chat = makeChat({ member_id: 'other-member-id' })
    const tag = makeTag()

    await membersRepository.save(member)
    await chatsRepository.save(chat)
    await tagsRepository.save(tag)

    const response = await sut.execute({
      chat_id: chat.id.value,
      tag_id: tag.id.value,
      requester_id: member.agent_id.value
    })

    expect(response.value).toBeNull()
    expect(chatsRepository.chats[0].tags.getItems().length).toBe(1)
  })

  it('should not add a tag to the chat if tag is already added', async () => {
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

    expect(response.value).toBeInstanceOf(AlreadyExistsError)
    expect(chatsRepository.chats[0].tags.getItems().length).toBe(1)
  })
})
