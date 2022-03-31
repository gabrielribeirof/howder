import { DeleteWorkspaceService } from '../delete-workspace.service'

import { InMemoryWorkspacesRepository } from '../../repositories/in-memory/in-memory-workspaces.repository'
import { InMemoryMembersRespository } from '../../repositories/in-memory/in-memory-members.repository'

import { UnauthorizedError } from '@shared/errors/unauthorized.error'

import { makeMember } from '@test/makers/member.maker'
import { makeWorkspace } from '@test/makers/workspace.maker'

let workspacesRepository: InMemoryWorkspacesRepository
let membersRespository: InMemoryMembersRespository
let sut: DeleteWorkspaceService

describe('DeleteWorkspaceService', () => {
  beforeEach(() => {
    workspacesRepository = new InMemoryWorkspacesRepository()
    membersRespository = new InMemoryMembersRespository()

    sut = new DeleteWorkspaceService(workspacesRepository, membersRespository)
  })

  it('should allow the workspace creator agent to delete that workspace', async () => {
    const workspace = makeWorkspace()
    const requesterMember = makeMember({
      agent_id: workspace.creator_id.value,
      workspace_id: workspace.id.value
    })

    await workspacesRepository.save(workspace)
    await membersRespository.save(requesterMember)

    const response = await sut.execute({
      workspace_id: workspace.id.value,
      requester_id: requesterMember.agent_id.value
    })

    expect(response.value).toBeNull()
    expect(workspacesRepository.workspaces.length).toBe(0)
  })

  it('should not allow a workspace non-creator agent to delete that workspace', async () => {
    const workspace = makeWorkspace()
    const requesterMember = makeMember({
      agent_id: 'some-agent-id',
      workspace_id: workspace.id.value
    })

    await workspacesRepository.save(workspace)
    await membersRespository.save(requesterMember)

    const response = await sut.execute({
      workspace_id: workspace.id.value,
      requester_id: requesterMember.agent_id.value
    })

    expect(response.value).toBeInstanceOf(UnauthorizedError)
    expect(workspacesRepository.workspaces.length).toBe(1)
  })
})
