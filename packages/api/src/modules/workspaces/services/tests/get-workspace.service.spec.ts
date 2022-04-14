import { GetWorkspaceService } from '../get-workspace.service'

import { InMemoryWorkspacesRepository } from '../../repositories/in-memory/in-memory-workspaces.repository'
import { InMemoryMembersRespository } from '../../repositories/in-memory/in-memory-members.repository'
import { InMemoryTeamsRespository } from '../../repositories/in-memory/in-memory-teams.repository'
import { InMemoryTagsRepository } from '@modules/chats/repositories/in-memory/in-memory-tags.repository'

import { UnauthorizedError } from '@shared/errors/unauthorized.error'

import { makeWorkspace } from '@test/helpers/makers/workspace.maker'
import { makeMember } from '@test/helpers/makers/member.maker'
import { makeTeam } from '@test/helpers/makers/team.maker'
import { makeTag } from '@test/helpers/makers/tag.maker'

let membersRepository: InMemoryMembersRespository
let teamsRespository: InMemoryTeamsRespository
let tagsRepository: InMemoryTagsRepository

let workspacesRepository: InMemoryWorkspacesRepository

let sut: GetWorkspaceService

describe('GetWorkspaceService', () => {
  beforeEach(() => {
    membersRepository = new InMemoryMembersRespository()
    teamsRespository = new InMemoryTeamsRespository()
    tagsRepository = new InMemoryTagsRepository()

    workspacesRepository = new InMemoryWorkspacesRepository(
      membersRepository,
      teamsRespository,
      tagsRepository
    )

    sut = new GetWorkspaceService(workspacesRepository, membersRepository)
  })

  it('should get a workspace', async () => {
    const workspace = makeWorkspace()
    const requesterMember = makeMember({ workspace_id: workspace.id.value })
    const team = makeTeam()
    const tag = makeTag()

    await workspacesRepository.save(workspace)
    await membersRepository.save(requesterMember)
    await teamsRespository.save(team)
    await tagsRepository.save(tag)

    const response = await sut.execute({
      workspace_id: workspace.id.value,
      requester_id: requesterMember.agent_id.value
    })

    expect(response.value).toHaveProperty('name')
  })

  it('should not get a workspace to a outside workspace member', async () => {
    const workspace = makeWorkspace()
    const requesterMember = makeMember({ workspace_id: 'other-workspace-id' })
    const team = makeTeam()
    const tag = makeTag()

    await workspacesRepository.save(workspace)
    await membersRepository.save(requesterMember)
    await teamsRespository.save(team)
    await tagsRepository.save(tag)

    const response = await sut.execute({
      workspace_id: workspace.id.value,
      requester_id: requesterMember.agent_id.value
    })

    expect(response.value).toBeInstanceOf(UnauthorizedError)
  })
})
