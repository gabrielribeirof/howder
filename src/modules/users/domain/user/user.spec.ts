import { User } from './user'
import { left } from '@shared/core/logic/either'

import { BadLengthViolation } from '@shared/errors/violations/bad-length.violation'
import { InvalidEmailViolation } from '@shared/errors/violations/invalid-email.violation'

describe('User domain entity', () => {
  it('should not create user with very long name', async () => {
    let longName = ''
    for (let i = 0; i < 35; i++) {
      longName += 'n'
    }

    const userOrError = User.create({ name: longName, email: 'valid@email.com' })

    expect(userOrError).toEqual(left([
      new BadLengthViolation('name', longName, 2, 32)
    ]))
  })

  it('should not create user with very short name', async () => {
    const shortName = 'n'

    const userOrError = User.create({ name: shortName, email: 'valid@email.com' })

    expect(userOrError).toEqual(left([
      new BadLengthViolation('name', shortName, 2, 32)
    ]))
  })

  it('should not create named user with only whitespace', async () => {
    const blankName = '     '

    const userOrError = User.create({ name: blankName, email: 'valid@email.com' })

    expect(userOrError).toEqual(left([
      new BadLengthViolation('name', '', 2, 32)
    ]))
  })

  it('should not create user with invalid e-mail', async () => {
    const email = 'not_an_email'

    const userOrError = User.create({ name: 'John Dow', email: email })

    expect(userOrError).toEqual(left([
      new InvalidEmailViolation(email)
    ]))
  })
})
