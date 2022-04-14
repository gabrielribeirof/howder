import { CreateTagService } from '../create-tag.service'

import { InMemoryTagsRepository } from '../../repositories/in-memory/in-memory-tags.repository'
import { InMemoryMembersRespository } from '@modules/workspaces/repositories/in-memory/in-memory-members.repository'

import { UnauthorizedError } from '@shared/errors/unauthorized.error'

import { makeMember } from '@test/helpers/makers/member.maker'

let tagsRepository: InMemoryTagsRepository
let membersRepository: InMemoryMembersRespository

let sut: CreateTagService

describe('CreateTagService', () => {
  beforeEach(() => {
    tagsRepository = new InMemoryTagsRepository()
    membersRepository = new InMemoryMembersRespository()

    sut = new CreateTagService(tagsRepository, membersRepository)
  })

  it('should allow a workspace admin member to create a tag', async () => {
    const creatorMember = makeMember({ is_admin: true })

    await membersRepository.save(creatorMember)

    const response = await sut.execute({
      name: 'Some Tag Name',
      workspace_id: creatorMember.workspace_id.value,
      requester_id: creatorMember.agent_id.value
    })

    expect(response.isRight()).toBeTruthy()
    expect(tagsRepository.tags.length).toBe(1)
  })

  it('should not allow a workspace non-admin member to create a tag', async () => {
    const creatorMember = makeMember({ is_admin: false })

    await membersRepository.save(creatorMember)

    const response = await sut.execute({
      name: 'Some Tag Name',
      workspace_id: creatorMember.workspace_id.value,
      requester_id: creatorMember.agent_id.value
    })

    expect(response.value).toBeInstanceOf(UnauthorizedError)
    expect(tagsRepository.tags.length).toBe(0)
  })
})
