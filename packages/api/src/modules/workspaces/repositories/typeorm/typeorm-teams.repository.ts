import { Repository, getRepository } from 'typeorm'

import { Team } from '@modules/workspaces/domain/team/team'
import { TeamMapper } from '@modules/workspaces/mappers/team.mapper'
import { TeamEntity } from '@infra/typeorm/entities/team.entity'
import { ITeamsRepository } from '../iteams.repository'

export class TypeORMTeamsRespository implements ITeamsRepository {
  private ormRepository: Repository<TeamEntity>

  constructor() {
    this.ormRepository = getRepository(TeamEntity)
  }

  public async findById(id: string): Promise<Team | undefined> {
    const team = await this.ormRepository.findOne(id)

    return team && TeamMapper.toDomain(team)
  }

  public async findByWorkspaceId(workspace_id: string): Promise<Team[] | undefined> {
    const teams = await this.ormRepository.find({
      where: { workspace_id }
    })

    return teams && teams.map(t => TeamMapper.toDomain(t))
  }

  public async findByIdAndWorkspaceId(id: string, workspace_id: string): Promise<Team | undefined> {
    const team = await this.ormRepository.findOne({
      where: {
        id,
        workspace_id
      }
    })

    return team && TeamMapper.toDomain(team)
  }

  public async save(team: Team): Promise<void> {
    await this.ormRepository.save(TeamMapper.toPersistence(team))
  }

  public async delete(team: Team): Promise<void> {
    await this.ormRepository.delete({ id: team.id.value })
  }
}
