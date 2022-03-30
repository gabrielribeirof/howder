import { Repository, getRepository } from 'typeorm'

import { Workspace } from '@modules/workspaces/domain/workspace/workspace'
import { WorkspaceWithDetailsDTO } from '@modules/workspaces/dtos/workspace-with-details.dto'
import { WorkspaceMapper } from '@modules/workspaces/mappers/workspace.mapper'
import { WorkspaceEntity } from '@shared/infra/typeorm/entities/workspace.entity'

import { IWorkspacesRespository } from '../iworkspaces.repository'

export class TypeORMWorkspacesRepository implements IWorkspacesRespository {
  private ormRepository: Repository<WorkspaceEntity>

  constructor() {
    this.ormRepository = getRepository(WorkspaceEntity)
  }

  public async findById(id: string): Promise<Workspace | undefined> {
    const workspace = await this.ormRepository.findOne(id)

    return workspace && WorkspaceMapper.toDomain(workspace)
  }

  public async findByIdWithDetails(id: string): Promise<WorkspaceWithDetailsDTO | undefined> {
    const workspace = await this.ormRepository.findOne(id, {
      relations: ['members', 'teams', 'tags']
    })

    if (!workspace) return undefined

    return {
      id: workspace.id,
      name: workspace.name,
      creator_id: workspace.creator_id,
      members: workspace.members.map(arrayMember => {
        return {
          id: arrayMember.id,
          agent_id: arrayMember.agent_id,
          workspace_id: arrayMember.workspace_id,
          is_admin: arrayMember.is_admin
        }
      }) || [],
      teams: workspace.teams.map(arrayTeam => {
        return {
          id: arrayTeam.id,
          name: arrayTeam.name,
          creator_id: arrayTeam.creator_id,
          workspace_id: arrayTeam.workspace_id,
          members_id: arrayTeam.members.map(arrayMember => {
            return arrayMember.id
          })
        }
      }) || [],
      tags: workspace.tags.map(arrayTag => {
        return {
          id: arrayTag.id,
          name: arrayTag.name,
          creator_id: arrayTag.creator_id,
          workspace_id: arrayTag.workspace_id
        }
      }) || []
    }
  }

  public async findForMemberAgentId(agentId: string): Promise<Workspace[] | undefined> {
    const workspaces = await this.ormRepository.createQueryBuilder('workspace')
      .leftJoin('workspace.members', 'member')
      .where('member.agent_id = :id', { id: agentId })
      .getMany()

    return workspaces && workspaces.map(w => WorkspaceMapper.toDomain(w))
  }

  public async save(workspace: Workspace): Promise<void> {
    await this.ormRepository.save(WorkspaceMapper.toPersistence(workspace))
  }

  public async delete(workspace: Workspace): Promise<void> {
    await this.ormRepository.delete({ id: workspace.id.value })
  }
}
