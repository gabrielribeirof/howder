import { left } from '@shared/core/logic/either'
import { MaxLengthViolation } from '@shared/errors/violations/max-length.violation'

import { Email } from './email'

describe('Email value object', () => {
  it('should accept valid email address', () => {
    const emailOrError = Email.create('valid@email.com')

    expect(emailOrError.isRight()).toBeTruthy()
  })

  it('should reject invalid email address', () => {
    const emailOrError1 = Email.create('invalid')
    const emailOrError2 = Email.create('invalid@email')
    const emailOrError3 = Email.create('@email.com')
    const emailOrError4 = Email.create('invalid@email.')

    expect(emailOrError1.isLeft()).toBeTruthy()
    expect(emailOrError2.isLeft()).toBeTruthy()
    expect(emailOrError3.isLeft()).toBeTruthy()
    expect(emailOrError4.isLeft()).toBeTruthy()
  })

  it('should reject emails with more than 320 characters', () => {
    const domain = 'e'.repeat(340)
    const value = `valid@${domain}.com`

    const emailOrError = Email.create(value)

    expect(emailOrError).toEqual(
      left(new MaxLengthViolation('email', value, 320))
    )
  })
})
