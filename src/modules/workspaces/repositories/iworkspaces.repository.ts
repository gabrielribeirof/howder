import { Workspace } from '../domain/workspace/workspace'
import { WorkspaceWithDetailsDTO } from '../dtos/workspace-with-details.dto'

export interface IWorkspacesRespository {
  findById(id: string): Promise<Workspace | undefined>
  findByIdWithDetails(id: string): Promise<WorkspaceWithDetailsDTO | undefined>
  findForMemberAgentId(agent_id: string): Promise<Workspace[] | undefined>
  save(workspace: Workspace): Promise<void>
  delete(workspace: Workspace): Promise<void>
}
