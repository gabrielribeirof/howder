import { Team } from '@modules/workspaces/domain/team/team'
import { ITeamsRepository } from '../iteams.repository'

export class InMemoryTeamsRespository implements ITeamsRepository {
  public teams: Team[] = []

  public async findById(id: string): Promise<Team | undefined> {
    return this.teams.find(arrayTeam => arrayTeam.id.value === id)
  }

  public async findByWorkspaceId(workspaceId: string): Promise<Team[] | undefined> {
    return this.teams.filter(arrayTeam => arrayTeam.workspace_id.value === workspaceId)
  }

  public async findByIdAndWorkspaceId(id: string, workspaceId: string): Promise<Team | undefined> {
    return this.teams.find(arrayTeam => arrayTeam.id.value === id && arrayTeam.workspace_id.value === workspaceId)
  }

  public async save(team: Team): Promise<void> {
    const index = this.teams.findIndex(arrayTeam => arrayTeam.id.equals(team.id))

    if (index >= 0) {
      this.teams[index] = team
      return
    }

    this.teams.push(team)
  }

  public async delete(team: Team): Promise<void> {
    const index = this.teams.findIndex(teamArray => teamArray.id.equals(team.id))

    this.teams.splice(index, 1)
  }
}
