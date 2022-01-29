import { left } from '@shared/core/logic/either'
import { BadLengthViolation } from '@shared/errors/violations/bad-length.violation'

import { Name } from './name'

describe('Name value object', () => {
  it('should accept valid name', () => {
    const nameOrError = Name.create('John Doe')

    expect(nameOrError.isRight()).toBeTruthy()
  })

  it('should reject name with less than 2 characters', () => {
    const nameOrError = Name.create('n')

    expect(nameOrError).toEqual(
      left(new BadLengthViolation('name', 'n', 2, 32))
    )
  })

  it('should reject name with more than 32 characters', () => {
    const value = 'n'.repeat(35)

    const nameOrError = Name.create(value)

    expect(nameOrError).toEqual(
      left(new BadLengthViolation('name', value, 2, 32))
    )
  })
})
