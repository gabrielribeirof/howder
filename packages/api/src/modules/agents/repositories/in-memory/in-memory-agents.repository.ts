import { Agent } from '@modules/agents/domain/agent/agent'
import { IAgentsRepository } from '../iagents.repository'

export class InMemoryAgentsRespository implements IAgentsRepository {
  public agents: Agent[] = []

  public async findById(id: string): Promise<Agent | undefined> {
    return this.agents.find(arrayAgent => arrayAgent.id.value === id)
  }

  public async findByEmail(email: string): Promise<Agent | undefined> {
    return this.agents.find(arrayAgent => arrayAgent.email.value === email)
  }

  public async save(agent: Agent): Promise<void> {
    const index = this.agents.findIndex(arrayAgent => arrayAgent.id.equals(agent.id))

    if (index >= 0) {
      this.agents[index] = agent
      return
    }

    this.agents.push(agent)
  }
}
