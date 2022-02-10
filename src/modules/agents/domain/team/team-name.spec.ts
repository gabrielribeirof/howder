import { left } from '@shared/core/logic/either'
import { BadLengthViolation } from '@shared/errors/violations/bad-length.violation'

import { TeamName } from './team-name'

describe('Team name value object', () => {
  it('should accept valid name', () => {
    const nameResult = TeamName.create('Team name')

    expect(nameResult.isRight()).toBeTruthy()
  })

  it('should reject name with less than 2 characters', () => {
    const nameResult = TeamName.create('n')

    expect(nameResult).toEqual(
      left(new BadLengthViolation('name', 'n', 2, 32))
    )
  })

  it('should reject name with more than 32 characters', () => {
    const value = 'n'.repeat(35)

    const nameResult = TeamName.create(value)

    expect(nameResult).toEqual(
      left(new BadLengthViolation('name', value, 2, 32))
    )
  })
})
