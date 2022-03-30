import { Agent } from '../domain/agent/agent'

export interface IAgentsRepository {
  findById(id: string): Promise<Agent | undefined>
  findByEmail(email: string): Promise<Agent | undefined>
  save(agent: Agent): Promise<void>
}
