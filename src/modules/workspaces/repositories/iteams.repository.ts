import { Team } from '../domain/team/team'

export interface ITeamsRepository {
  findById(id: string): Promise<Team | undefined>
  findByWorkspaceId(workspaceId: string): Promise<Team[] | undefined>
  findByIdAndWorkspaceId(id: string, workspaceId: string): Promise<Team | undefined>
  save(team: Team): Promise<void>
  delete(team: Team): Promise<void>
}
