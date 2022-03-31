import { CreateTeamService } from '../create-team.service'

import { InMemoryTeamsRespository } from '../../repositories/in-memory/in-memory-teams.repository'
import { InMemoryMembersRespository } from '../../repositories/in-memory/in-memory-members.repository'

import { makeMember } from '@test/makers/member.maker'

let membersRespository: InMemoryMembersRespository
let teamsRepository: InMemoryTeamsRespository
let sut: CreateTeamService

describe('CreateTeamService', () => {
  beforeEach(() => {
    membersRespository = new InMemoryMembersRespository()
    teamsRepository = new InMemoryTeamsRespository()

    sut = new CreateTeamService(teamsRepository, membersRespository)
  })

  it('should allow a workspace admin member to create a new team', async () => {
    const member = makeMember({ is_admin: true })
    await membersRespository.save(member)

    const response = await sut.execute({
      name: 'Teste Team Name',
      workspace_id: member.workspace_id.value,
      creator_id: member.agent_id.value
    })

    expect(response.isRight()).toBeTruthy()
    expect(teamsRepository.teams.length).toBe(1)
  })
})
