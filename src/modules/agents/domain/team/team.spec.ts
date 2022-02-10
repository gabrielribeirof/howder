import { Team } from './team'

describe('Team aggregate root', () => {
  it('should be able to create new team', async () => {
    const teamResult = Team.create({ name: 'Some team name' })

    expect(teamResult.isRight()).toBeTruthy()
  })
})
