import { Agent } from '@modules/agents/domain/agent/agent'
import { createAgent } from '@modules/agents/domain/agent/factories/agent.factory'

type AgentOverrides = {
  name?: string
  email?: string
  password?: string
}

export function makeAgent(overrides?: AgentOverrides): Agent {
  const agent = createAgent({
    name: overrides?.name ?? 'Joe Doe',
    email: overrides?.email ?? 'joedoe@example.com',
    password: overrides?.password ?? '123456'
  })

  if (agent.isLeft()) throw new Error()

  return agent.value
}
