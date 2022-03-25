import { Workspace } from '@modules/workspaces/domain/workspace/workspace'
import { IWorkspacesRespository } from '../iworkspaces.repository'

import { InMemoryMembersRespository } from '../in-memory/in-memory-members.repository'
import { InMemoryTeamsRespository } from '../in-memory/in-memory-teams.repository'
import { InMemoryTagsRepository } from '@modules/chats/repositories/in-memory/in-memory-tags.repository'

import { WorkspaceWithDetails } from '@modules/workspaces/dtos/workspace-with-details.dto'

export class InMemoryWorkspacesRepository implements IWorkspacesRespository {
  public workspaces: Workspace[] = []

  constructor(
    private membersRepository?: InMemoryMembersRespository,
    private teamsRespository?: InMemoryTeamsRespository,
    private tagsRepository?: InMemoryTagsRepository
  ) {}

  public async findById(id: string): Promise<Workspace | undefined> {
    return this.workspaces.find(arrayWorkspace => arrayWorkspace.id.value === id)
  }

  public async findByIdWithDetails(id: string): Promise<WorkspaceWithDetails | undefined> {
    const workspace = this.workspaces.find(arrayWorkspace => arrayWorkspace.id.value === id)
    const members = await this.membersRepository?.findByWorkspaceId(id)
    const teams = await this.teamsRespository?.findByWorkspaceId(id)
    const tags = await this.tagsRepository?.findByWorkspaceId(id)

    if (!workspace) return undefined

    return {
      name: workspace.name.value,
      creator_id: workspace.creator_id.value,
      members: members?.map(arrayMember => {
        return {
          agent_id: arrayMember.agent_id.value,
          workspace_id: arrayMember.workspace_id.value,
          is_admin: arrayMember.is_admin
        }
      }) || [],
      teams: teams?.map(arrayTeam => {
        return {
          name: arrayTeam.name.value,
          creator_id: arrayTeam.creator_id.value,
          workspace_id: arrayTeam.workspace_id.value,
          members_id: arrayTeam.members.getItems().map(arrayTeamMember => {
            return arrayTeamMember.member_id.value
          })
        }
      }) || [],
      tags: tags?.map(arrayTag => {
        return {
          name: arrayTag.name.value,
          creator_id: arrayTag.creator_id.value,
          workspace_id: arrayTag.workspace_id.value
        }
      }) || []
    }
  }

  public async findForMemberAgentId(agentId: string): Promise<Workspace[] | undefined> {
    const members = this.membersRepository?.members.filter(arrayMember => (
      arrayMember.agent_id.value === agentId
    ))

    return this.workspaces.filter((arrayWorkspace) => {
      return members?.some(arrayMember => arrayMember.workspace_id.value === arrayWorkspace.id.value)
    })
  }

  public async save(workspace: Workspace): Promise<void> {
    const index = this.workspaces.findIndex(arrayWorkspace => arrayWorkspace.id.equals(workspace.id))

    if (index >= 0) {
      this.workspaces[index] = workspace
      return
    }

    this.workspaces.push(workspace)
  }

  public async delete(workspace: Workspace): Promise<void> {
    const index = this.workspaces.findIndex(arrayWorkspace => arrayWorkspace.id.equals(workspace.id))

    this.workspaces.splice(index, 1)
  }
}
