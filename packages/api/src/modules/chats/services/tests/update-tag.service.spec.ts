import { UpdateTagService } from '../update-tag.service'

import { InMemoryTagsRepository } from '../../repositories/in-memory/in-memory-tags.repository'
import { InMemoryMembersRespository } from '@modules/workspaces/repositories/in-memory/in-memory-members.repository'

import { UnauthorizedError } from '@shared/errors/unauthorized.error'

import { makeMember } from '@test/helpers/makers/member.maker'
import { makeTag } from '@test/helpers/makers/tag.maker'

let tagsRepository: InMemoryTagsRepository
let membersRepository: InMemoryMembersRespository

let sut: UpdateTagService

describe('UpdateTagService', () => {
  beforeEach(() => {
    tagsRepository = new InMemoryTagsRepository()
    membersRepository = new InMemoryMembersRespository()

    sut = new UpdateTagService(tagsRepository, membersRepository)
  })

  it('should allow a workspace admin member to update a tag', async () => {
    const requesterMember = makeMember({ is_admin: true })
    const tag = makeTag()

    await membersRepository.save(requesterMember)
    await tagsRepository.save(tag)

    const response = await sut.execute({
      name: 'Updated Name',
      tag_id: tag.id.value,
      requester_id: requesterMember.agent_id.value
    })

    expect(response.isRight()).toBeTruthy()
    expect(tagsRepository.tags[0].name.value).toBe('Updated Name')
  })

  it('should not allow a workspace non-admin member to update a tag', async () => {
    const requesterMember = makeMember({ is_admin: false })
    const tag = makeTag()

    await membersRepository.save(requesterMember)
    await tagsRepository.save(tag)

    const response = await sut.execute({
      name: 'Updated Name',
      tag_id: tag.id.value,
      requester_id: requesterMember.agent_id.value
    })

    expect(response.value).toBeInstanceOf(UnauthorizedError)
    expect(tagsRepository.tags[0].name.value).toBe(tag.name.value)
  })
})
