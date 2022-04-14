import { DeleteTagService } from '../delete-tag.service'

import { InMemoryTagsRepository } from '../../repositories/in-memory/in-memory-tags.repository'
import { InMemoryMembersRespository } from '@modules/workspaces/repositories/in-memory/in-memory-members.repository'

import { UnauthorizedError } from '@shared/errors/unauthorized.error'

import { makeMember } from '@test/helpers/makers/member.maker'
import { makeTag } from '@test/helpers/makers/tag.maker'

let tagsRepository: InMemoryTagsRepository
let membersRepository: InMemoryMembersRespository

let sut: DeleteTagService

describe('DeleteTagService', () => {
  beforeEach(() => {
    tagsRepository = new InMemoryTagsRepository()
    membersRepository = new InMemoryMembersRespository()

    sut = new DeleteTagService(tagsRepository, membersRepository)
  })

  it('should allow a workspace admin member to delete a tag', async () => {
    const requesterMember = makeMember({ is_admin: true })
    const tag = makeTag()

    await membersRepository.save(requesterMember)
    await tagsRepository.save(tag)

    const response = await sut.execute({
      tag_id: tag.id.value,
      requester_id: requesterMember.agent_id.value
    })

    expect(response.value).toBeNull()
    expect(tagsRepository.tags.length).toBe(0)
  })

  it('should not allow a workspace non-admin member to delete a tag', async () => {
    const requesterMember = makeMember({ is_admin: false })
    const tag = makeTag()

    await membersRepository.save(requesterMember)
    await tagsRepository.save(tag)

    const response = await sut.execute({
      tag_id: tag.id.value,
      requester_id: requesterMember.agent_id.value
    })

    expect(response.value).toBeInstanceOf(UnauthorizedError)
    expect(tagsRepository.tags.length).toBe(1)
  })
})
