import { Workspace } from '../domain/workspace/workspace'
import { WorkspaceWithDetails } from '../dtos/workspace-with-details.dto'

export interface IWorkspacesRespository {
  findById(id: string): Promise<Workspace | undefined>
  findByIdWithDetails(id: string): Promise<WorkspaceWithDetails | undefined>
  findForMemberAgentId(agentId: string): Promise<Workspace[] | undefined>
  save(workspace: Workspace): Promise<void>
  delete(workspace: Workspace): Promise<void>
}
