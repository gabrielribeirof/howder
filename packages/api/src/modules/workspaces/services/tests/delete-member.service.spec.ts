import { DeleteMemberService } from '../delete-member.service'

import { InMemoryMembersRespository } from '../../repositories/in-memory/in-memory-members.repository'
import { InMemoryWorkspacesRepository } from '../../repositories/in-memory/in-memory-workspaces.repository'

import { UnauthorizedError } from '@shared/errors/unauthorized.error'

import { makeMember } from '@test/helpers/makers/member.maker'
import { makeWorkspace } from '@test/helpers/makers/workspace.maker'

let membersRespository: InMemoryMembersRespository
let workspacesRepository: InMemoryWorkspacesRepository
let sut: DeleteMemberService

describe('DeleteMemberService', () => {
  beforeEach(() => {
    membersRespository = new InMemoryMembersRespository()
    workspacesRepository = new InMemoryWorkspacesRepository()

    sut = new DeleteMemberService(membersRespository, workspacesRepository)
  })

  it('should allow a workspace admin member to delete a member', async () => {
    const workspace = makeWorkspace()
    const member = makeMember({ workspace_id: workspace.id.value })
    const requesterMember = makeMember({
      agent_id: 'requester-agent-id',
      workspace_id: workspace.id.value,
      is_admin: true
    })

    await workspacesRepository.save(workspace)
    await membersRespository.save(member)
    await membersRespository.save(requesterMember)

    const response = await sut.execute({
      member_id: member.id.value,
      requester_id: requesterMember.agent_id.value
    })

    expect(response.value).toBeNull()
    expect(membersRespository.members.length).toBe(1)
  })

  it('should not allow a workspace non-admin member to delete a member', async () => {
    const workspace = makeWorkspace()
    const member = makeMember({ workspace_id: workspace.id.value })
    const requesterMember = makeMember({
      agent_id: 'requester-agent-id',
      workspace_id: workspace.id.value,
      is_admin: false
    })

    await workspacesRepository.save(workspace)
    await membersRespository.save(member)
    await membersRespository.save(requesterMember)

    const response = await sut.execute({
      member_id: member.id.value,
      requester_id: requesterMember.agent_id.value
    })

    expect(response.value).toBeInstanceOf(UnauthorizedError)
    expect(membersRespository.members.length).toBe(2)
  })

  it('should not allow a workspace admin member to delete the workspace creator member', async () => {
    const workspace = makeWorkspace()
    const member = makeMember({
      agent_id: workspace.creator_id.value,
      workspace_id: workspace.id.value
    })
    const requesterMember = makeMember({
      agent_id: 'requester-agent-id',
      workspace_id: workspace.id.value,
      is_admin: true
    })

    await workspacesRepository.save(workspace)
    await membersRespository.save(member)
    await membersRespository.save(requesterMember)

    const response = await sut.execute({
      member_id: member.id.value,
      requester_id: requesterMember.agent_id.value
    })

    expect(response.value).toBeInstanceOf(UnauthorizedError)
    expect(membersRespository.members.length).toBe(2)
  })

  it('should not allow a workspace admin member to self-delete', async () => {
    const workspace = makeWorkspace()
    const requesterMember = makeMember({
      agent_id: 'requester-agent-id',
      workspace_id: workspace.id.value,
      is_admin: true
    })

    await workspacesRepository.save(workspace)
    await membersRespository.save(requesterMember)

    const response = await sut.execute({
      member_id: requesterMember.id.value,
      requester_id: requesterMember.agent_id.value
    })

    expect(response.value).toBeInstanceOf(UnauthorizedError)
    expect(membersRespository.members.length).toBe(1)
  })
})
