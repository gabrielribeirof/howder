import { CreateWorkspaceService } from '../create-workspace.service'

import { InMemoryWorkspacesRepository } from '../../repositories/in-memory/in-memory-workspaces.repository'
import { InMemoryMembersRespository } from '@modules/workspaces/repositories/in-memory/in-memory-members.repository'

describe('CreateWorkspaceService', () => {
  it('should create a workspace', async () => {
    const workspacesRespository = new InMemoryWorkspacesRepository()
    const membersRespository = new InMemoryMembersRespository()
    const sut = new CreateWorkspaceService(workspacesRespository, membersRespository)

    const response = await sut.execute({
      name: 'Workspace Test Name',
      requester_id: 'requester-id'
    })

    expect(response.isRight()).toBeTruthy()
  })
})
