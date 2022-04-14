import { CreateMemberService } from '../create-member.service'

import { InMemoryWorkspacesRepository } from '../../repositories/in-memory/in-memory-workspaces.repository'
import { InMemoryMembersRespository } from '../../repositories/in-memory/in-memory-members.repository'
import { InMemoryAgentsRespository } from '@modules/agents/repositories/in-memory/in-memory-agents.repository'

import { makeWorkspace } from '@test/helpers/makers/workspace.maker'
import { makeMember } from '@test/helpers/makers/member.maker'
import { makeAgent } from '@test/helpers/makers/agent.maker'

let workspacesRespository: InMemoryWorkspacesRepository
let membersRepository: InMemoryMembersRespository
let agentsRepository: InMemoryAgentsRespository
let sut: CreateMemberService

describe('CreateMemberService', () => {
  beforeEach(() => {
    workspacesRespository = new InMemoryWorkspacesRepository()
    membersRepository = new InMemoryMembersRespository()
    agentsRepository = new InMemoryAgentsRespository()

    sut = new CreateMemberService(
      workspacesRespository,
      membersRepository,
      agentsRepository
    )
  })

  it('should allow an admin member to create a new member', async () => {
    const workspace = makeWorkspace()
    const requesterAgent = makeAgent()
    const requesterMember = makeMember({
      agent_id: requesterAgent.id.value,
      workspace_id: workspace.id.value,
      is_admin: true
    })

    await workspacesRespository.save(workspace)
    await agentsRepository.save(requesterAgent)
    await membersRepository.save(requesterMember)

    const agentToBecomeMember = makeAgent({ email: 'agent@example.com' })
    await agentsRepository.save(agentToBecomeMember)

    const response = await sut.execute({
      workspace_id: workspace.id.value,
      email: agentToBecomeMember.email.value,
      requester_id: requesterAgent.id.value
    })

    expect(response.isRight()).toBeTruthy()
    expect(membersRepository.members.length).toBe(2)
    expect(await membersRepository.findByWorkspaceIdAndAgentId(workspace.id.value, agentToBecomeMember.id.value)).toBeTruthy()
  })

  it('should not allow a non-admin member to create a new member', async () => {
    const workspace = makeWorkspace()
    const requesterAgent = makeAgent()
    const requesterMember = makeMember({
      agent_id: requesterAgent.id.value,
      workspace_id: workspace.id.value,
      is_admin: false
    })

    await workspacesRespository.save(workspace)
    await agentsRepository.save(requesterAgent)
    await membersRepository.save(requesterMember)

    const agentToBecomeMember = makeAgent({ email: 'agent@example.com' })
    await agentsRepository.save(agentToBecomeMember)

    const response = await sut.execute({
      workspace_id: workspace.id.value,
      email: agentToBecomeMember.email.value,
      requester_id: requesterAgent.id.value
    })

    expect(response.isLeft()).toBeTruthy()
    expect(membersRepository.members.length).toBe(1)
    expect(await membersRepository.findByWorkspaceIdAndAgentId(workspace.id.value, agentToBecomeMember.id.value)).toBeUndefined()
  })
})
