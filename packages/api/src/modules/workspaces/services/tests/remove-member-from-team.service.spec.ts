import { RemoveMemberFromTeamService } from '../remove-member-from-team.service'

import { InMemoryMembersRespository } from '../../repositories/in-memory/in-memory-members.repository'
import { InMemoryTeamsRespository } from '../../repositories/in-memory/in-memory-teams.repository'

import { UnauthorizedError } from '@shared/errors/unauthorized.error'

import { TeamMember } from '../../domain/team/team-member'
import { makeMember } from '@test/helpers/makers/member.maker'
import { makeTeam } from '@test/helpers/makers/team.maker'

let membersRepository: InMemoryMembersRespository
let teamsRepository: InMemoryTeamsRespository
let sut: RemoveMemberFromTeamService

describe('RemoveMemberFromTeamService', () => {
  beforeEach(() => {
    membersRepository = new InMemoryMembersRespository()
    teamsRepository = new InMemoryTeamsRespository()

    sut = new RemoveMemberFromTeamService(membersRepository, teamsRepository)
  })

  it('should allow a workspace admin member to remove a member from a team', async () => {
    const requesterMember = makeMember({ is_admin: true })
    const member = makeMember()
    const team = makeTeam()
    const teamMember = TeamMember.create({ member_id: member.id })

    team.addMember(teamMember)

    await membersRepository.save(requesterMember)
    await membersRepository.save(member)
    await teamsRepository.save(team)

    const response = await sut.execute({
      member_id: member.id.value,
      team_id: team.id.value,
      requester_id: requesterMember.agent_id.value
    })

    expect(response.value).toBeNull()
    expect(teamsRepository.teams[0].members.getItems().length).toBe(0)
  })

  it('should not allow a workspace non-admin member to remove a member from a team', async () => {
    const requesterMember = makeMember({ is_admin: false })
    const member = makeMember()
    const team = makeTeam()
    const teamMember = TeamMember.create({ member_id: member.id })

    team.addMember(teamMember)

    await membersRepository.save(requesterMember)
    await membersRepository.save(member)
    await teamsRepository.save(team)

    const response = await sut.execute({
      member_id: member.id.value,
      team_id: team.id.value,
      requester_id: requesterMember.agent_id.value
    })

    expect(response.value).toBeInstanceOf(UnauthorizedError)
    expect(teamsRepository.teams[0].members.getItems().length).toBe(1)
  })
})
