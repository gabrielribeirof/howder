import { Team } from './team'

describe('Team aggregate root', () => {
  it('should create new team', async () => {
    const teamResult = Team.create({ name: 'Some team name' })

    expect(teamResult.isRight()).toBeTruthy()
  })
})
