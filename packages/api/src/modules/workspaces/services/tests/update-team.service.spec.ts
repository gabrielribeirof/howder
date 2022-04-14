import { UpdateTeamService } from '../update-team.service'

import { InMemoryTeamsRespository } from '../../repositories/in-memory/in-memory-teams.repository'
import { InMemoryMembersRespository } from '../../repositories/in-memory/in-memory-members.repository'

import { InvalidParameterError } from '@shared/errors/invalid-parameter.error'
import { UnauthorizedError } from '@shared/errors/unauthorized.error'

import { Team } from '../../domain/team/team'
import { makeTeam } from '@test/helpers/makers/team.maker'
import { makeMember } from '@test/helpers/makers/member.maker'

let teamsRespository: InMemoryTeamsRespository
let membersRespository: InMemoryMembersRespository
let sut: UpdateTeamService

describe('UpdateTeamService', () => {
  beforeEach(() => {
    teamsRespository = new InMemoryTeamsRespository()
    membersRespository = new InMemoryMembersRespository()

    sut = new UpdateTeamService(teamsRespository, membersRespository)
  })

  it('should allow a workspace admin member to update a team', async () => {
    const team = makeTeam({ workspace_id: 'workspace-id' })
    const member = makeMember({
      workspace_id: 'workspace-id',
      is_admin: true
    })

    await teamsRespository.save(team)
    await membersRespository.save(member)

    const response = await sut.execute({
      name: 'Updated Name',
      team_id: team.id.value,
      requester_id: member.agent_id.value
    })

    expect(response.value).toBeInstanceOf(Team)
    expect(teamsRespository.teams[0].name.value).toBe('Updated Name')
  })

  it('should not allow a workspace non-admin member to update a team', async () => {
    const team = makeTeam({ workspace_id: 'workspace-id' })
    const member = makeMember({
      workspace_id: 'workspace-id',
      is_admin: false
    })

    await teamsRespository.save(team)
    await membersRespository.save(member)

    const response = await sut.execute({
      name: 'Updated Name',
      team_id: team.id.value,
      requester_id: member.agent_id.value
    })

    expect(response.value).toBeInstanceOf(UnauthorizedError)
    expect(teamsRespository.teams[0].name.value).toBe(team.name.value)
  })

  it('should not update a team with invalid data', async () => {
    const team = makeTeam({ workspace_id: 'workspace-id' })
    const member = makeMember({
      workspace_id: 'workspace-id',
      is_admin: true
    })

    await teamsRespository.save(team)
    await membersRespository.save(member)

    const response = await sut.execute({
      name: 'U',
      team_id: team.id.value,
      requester_id: member.agent_id.value
    })

    expect(response.value).toBeInstanceOf(InvalidParameterError)
    expect(teamsRespository.teams[0].name.value).toBe(team.name.value)
  })
})
