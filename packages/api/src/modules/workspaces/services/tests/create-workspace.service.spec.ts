import { CreateWorkspaceService } from '../create-workspace.service'

import { InMemoryWorkspacesRepository } from '../../repositories/in-memory/in-memory-workspaces.repository'

describe('CreateWorkspaceService', () => {
  it('should create a workspace', async () => {
    const workspacesRespository = new InMemoryWorkspacesRepository()
    const sut = new CreateWorkspaceService(workspacesRespository)

    const response = await sut.execute({
      name: 'Workspace Test Name',
      requester_id: 'requester-id'
    })

    expect(response.isRight()).toBeTruthy()
  })
})
