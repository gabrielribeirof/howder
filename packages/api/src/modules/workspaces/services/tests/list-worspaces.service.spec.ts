import { ListWorkspacesService } from '../list-workspaces.service'

import { InMemoryMembersRespository } from '../../repositories/in-memory/in-memory-members.repository'
import { InMemoryWorkspacesRepository } from '../../repositories/in-memory/in-memory-workspaces.repository'

import { makeWorkspace } from '@test/makers/workspace.maker'
import { makeMember } from '@test/makers/member.maker'
import { Workspace } from '../../domain/workspace/workspace'

let membersRespository: InMemoryMembersRespository
let workspacesRepository: InMemoryWorkspacesRepository
let sut: ListWorkspacesService

describe('ListWorkspacesService', () => {
  beforeEach(() => {
    membersRespository = new InMemoryMembersRespository()
    workspacesRepository = new InMemoryWorkspacesRepository(membersRespository)

    sut = new ListWorkspacesService(workspacesRepository)
  })

  it('should list workspaces for a member agent id', async () => {
    const workspace1 = makeWorkspace()
    const workspace2 = makeWorkspace()
    const workspace3 = makeWorkspace()
    const workspace4 = makeWorkspace()
    const member1 = makeMember({ workspace_id: workspace1.id.value })
    const member2 = makeMember({ workspace_id: workspace2.id.value })
    const member3 = makeMember({ workspace_id: workspace3.id.value })
    const member4 = makeMember({ workspace_id: workspace4.id.value, agent_id: 'other-agent-id' })

    await workspacesRepository.save(workspace1)
    await workspacesRepository.save(workspace2)
    await workspacesRepository.save(workspace3)
    await workspacesRepository.save(workspace4)
    await membersRespository.save(member1)
    await membersRespository.save(member2)
    await membersRespository.save(member3)
    await membersRespository.save(member4)

    const response = await sut.execute({ requester_id: member1.agent_id.value })

    expect(response.isRight()).toBeTruthy()
    expect(response.isRight() && response.value.length).toBe(3)
    expect(response.isRight() && response.value[0]).toBeInstanceOf(Workspace)
  })

  it('should return an empty array for no workspace given a member agent id', async () => {
    const response = await sut.execute({ requester_id: 'agent-id' })

    expect(response.value).toEqual([])
  })
})
