import { AddMemberToTeamService } from '../add-member-to-team.service'

import { InMemoryMembersRespository } from '../../repositories/in-memory/in-memory-members.repository'
import { InMemoryTeamsRespository } from '../../repositories/in-memory/in-memory-teams.repository'

import { UnauthorizedError } from '@shared/errors/unauthorized.error'

import { makeMember } from '@test/makers/member.maker'
import { makeTeam } from '@test/makers/team.maker'

let membersRepository: InMemoryMembersRespository
let teamsRepository: InMemoryTeamsRespository
let sut: AddMemberToTeamService

describe('AddMemberToTeamService', () => {
  beforeEach(() => {
    membersRepository = new InMemoryMembersRespository()
    teamsRepository = new InMemoryTeamsRespository()

    sut = new AddMemberToTeamService(membersRepository, teamsRepository)
  })

  it('should allow a workspace admin member to add a member to a team', async () => {
    const requesterMember = makeMember({ is_admin: true })
    const member = makeMember()
    const team = makeTeam()

    await membersRepository.save(requesterMember)
    await membersRepository.save(member)
    await teamsRepository.save(team)

    const response = await sut.execute({
      member_id: member.id.value,
      team_id: team.id.value,
      requester_id: requesterMember.agent_id.value
    })

    expect(response.value).toBeNull()
    expect(teamsRepository.teams[0].members.getItems().length).toBe(1)
  })

  it('should not allow a workspace non-admin member to add a member to a team', async () => {
    const requesterMember = makeMember()
    const member = makeMember()
    const team = makeTeam()

    await membersRepository.save(requesterMember)
    await membersRepository.save(member)
    await teamsRepository.save(team)

    const response = await sut.execute({
      member_id: member.id.value,
      team_id: team.id.value,
      requester_id: requesterMember.agent_id.value
    })

    expect(response.value).toBeInstanceOf(UnauthorizedError)
    expect(teamsRepository.teams[0].members.getItems().length).toBe(0)
  })
})
