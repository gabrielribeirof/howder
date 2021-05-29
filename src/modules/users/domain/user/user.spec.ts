import { left } from '@shared/core/result'

import { User } from './user'

import { BadLengthError } from '@shared/domain/errors/bad-length.error'
import { InvalidEmailError } from '@shared/domain/errors/invalid-email.error'

describe('User domain entity', () => {
  it('should not create user with very long name', async () => {
    let longName = ''
    for (let i = 0; i <= 32; i++) {
      longName += 'c'
    }

    const userOrError = User.create({ name: longName, email: 'valid@email.com' })

    expect(userOrError).toEqual(left([
      new BadLengthError('name', longName, 2, 32)
    ]))
  })

  it('should not create user with very short name', async () => {
    const shortname = 'c'

    const userOrError = User.create({ name: shortname, email: 'valid@email.com' })

    expect(userOrError).toEqual(left([
      new BadLengthError('name', shortname, 2, 32)
    ]))
  })

  it('should not create named user with only blanks', async () => {
    const blankName = '     '

    const userOrError = User.create({ name: blankName, email: 'valid@email.com' })

    expect(userOrError).toEqual(left([
      new BadLengthError('name', '', 2, 32)
    ]))
  })

  it('should not create user with invalid e-mail', async () => {
    const email = 'not_an_email'

    const userOrError = User.create({ name: 'Gabriel', email: email })

    expect(userOrError).toEqual(left([
      new InvalidEmailError(email)
    ]))
  })
})
