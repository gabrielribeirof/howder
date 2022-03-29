import { Repository, getRepository } from 'typeorm'

import { Agent } from '@modules/agents/domain/agent/agent'
import { AgentEntity } from '@shared/infra/typeorm/entities/agent.entity'
import { AgentMapper } from '@modules/agents/mappers/agent.mapper'

import { IAgentsRepository } from '../iagents.repository'

export class TypeORMAgentsRepository implements IAgentsRepository {
  private ormRepository: Repository<AgentEntity>

  constructor() {
    this.ormRepository = getRepository(AgentEntity)
  }

  public async findById(id: string): Promise<Agent | undefined> {
    const agent = await this.ormRepository.findOne(id)

    return agent && AgentMapper.toDomain(agent)
  }

  public async findByEmail(email: string): Promise<Agent | undefined> {
    const agent = await this.ormRepository.findOne({
      where: { email }
    })

    return agent && AgentMapper.toDomain(agent)
  }

  public async save(agent: Agent): Promise<void> {
    const toPersistence = await AgentMapper.toPersistence(agent)
    const created = this.ormRepository.create(toPersistence)

    await this.ormRepository.save(created)
  }
}
