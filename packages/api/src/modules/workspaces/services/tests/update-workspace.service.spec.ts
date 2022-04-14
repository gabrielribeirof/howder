import { UpdateWorkspaceService } from '../update-workspace.service'

import { InMemoryWorkspacesRepository } from '../../repositories/in-memory/in-memory-workspaces.repository'

import { InvalidParameterError } from '@shared/errors/invalid-parameter.error'
import { UnauthorizedError } from '@shared/errors/unauthorized.error'

import { Workspace } from '../../domain/workspace/workspace'
import { makeWorkspace } from '@test/helpers/makers/workspace.maker'

let workspacesRepository: InMemoryWorkspacesRepository
let sut: UpdateWorkspaceService

describe('UpdateWorkspaceService', () => {
  beforeEach(() => {
    workspacesRepository = new InMemoryWorkspacesRepository()

    sut = new UpdateWorkspaceService(workspacesRepository)
  })

  it('should allow the workspace creator agent to update the workspace', async () => {
    const workspace = makeWorkspace({ creator_id: 'agent-id' })

    await workspacesRepository.save(workspace)

    const response = await sut.execute({
      workspace_id: workspace.id.value,
      name: 'Updated Name',
      requester_id: 'agent-id'
    })

    expect(response.value).toBeInstanceOf(Workspace)
    expect(workspacesRepository.workspaces[0].name.value).toBe('Updated Name')
  })

  it('should not allow the workspace non-creator agent to update the workspace', async () => {
    const workspace = makeWorkspace({ creator_id: 'agent-id' })

    await workspacesRepository.save(workspace)

    const response = await sut.execute({
      workspace_id: workspace.id.value,
      name: 'Updated Name',
      requester_id: 'other-agent-id'
    })

    expect(response.value).toBeInstanceOf(UnauthorizedError)
    expect(workspacesRepository.workspaces[0].name.value).toBe(workspace.name.value)
  })

  it('should not update a workspace with invalid data', async () => {
    const workspace = makeWorkspace({ creator_id: 'agent-id' })

    await workspacesRepository.save(workspace)

    const response = await sut.execute({
      workspace_id: workspace.id.value,
      name: 'U',
      requester_id: 'agent-id'
    })

    expect(response.value).toBeInstanceOf(InvalidParameterError)
    expect(workspacesRepository.workspaces[0].name.value).toBe(workspace.name.value)
  })
})
