import { Agent } from '../domain/agent/agent'
import { AgentDTO } from '../dtos/agent.dto'
import { AgentEntity } from '@shared/infra/typeorm/entities/agent.entity'
import { createAgent } from '../domain/agent/factories/agent.factory'

export class AgentMapper {
  public static toDTO(agent: Agent): AgentDTO {
    return {
      id: agent.id.value,
      name: agent.name.value,
      email: agent.email.value
    }
  }

  public static toDomain(agent: AgentEntity): Agent {
    const result = createAgent({
      id: agent.id,
      name: agent.name,
      email: agent.email,
      password: agent.password,
      isPasswordHashed: true
    })

    if (result.isLeft()) throw new Error('Error on AgentMapper.toDomain()')

    return result.value
  }

  public static async toPersistence(agent: Agent): Promise<AgentEntity> {
    const a = new AgentEntity()

    a.id = agent.id.value
    a.name = agent.name.value
    a.email = agent.email.value
    a.password = await agent.password.getHashedValue()

    return a
  }
}
