import { DeleteTeamService } from '../delete-team.service'

import { InMemoryTeamsRespository } from '../../repositories/in-memory/in-memory-teams.repository'
import { InMemoryMembersRespository } from '../../repositories/in-memory/in-memory-members.repository'

import { InvalidParameterError } from '@shared/errors/invalid-parameter.error'
import { UnauthorizedError } from '@shared/errors/unauthorized.error'

import { Team } from '../../domain/team/team'
import { makeTeam } from '@test/makers/team.maker'
import { makeMember } from '@test/makers/member.maker'

let teamsRespository: InMemoryTeamsRespository
let membersRespository: InMemoryMembersRespository
let sut: DeleteTeamService

describe('DeleteTeamService', () => {
  beforeEach(() => {
    teamsRespository = new InMemoryTeamsRespository()
    membersRespository = new InMemoryMembersRespository()

    sut = new DeleteTeamService(teamsRespository, membersRespository)
  })

  it('should allow a workspace admin member to delete a team', async () => {
    const team = makeTeam({ workspace_id: 'workspace-id' })
    const member = makeMember({
      workspace_id: 'workspace-id',
      is_admin: true
    })

    await teamsRespository.save(team)
    await membersRespository.save(member)

    const response = await sut.execute({
      team_id: team.id.value,
      requester_id: member.agent_id.value
    })

    expect(response.value).toBeNull()
    expect(teamsRespository.teams.length).toBe(0)
  })

  it('should not allow a workspace non-admin member to delete a team', async () => {
    const team = makeTeam({ workspace_id: 'workspace-id' })
    const member = makeMember({
      workspace_id: 'workspace-id',
      is_admin: false
    })

    await teamsRespository.save(team)
    await membersRespository.save(member)

    const response = await sut.execute({
      team_id: team.id.value,
      requester_id: member.agent_id.value
    })

    expect(response.value).toBeInstanceOf(UnauthorizedError)
    expect(teamsRespository.teams.length).toBe(1)
  })
})
