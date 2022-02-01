import { left } from '@shared/core/logic/either'
import { MaxLengthViolation } from '@shared/errors/violations/max-length.violation'

import { Email } from './email'

describe('Email value object', () => {
  it('should accept valid email address', () => {
    const emailResult = Email.create('valid@email.com')

    expect(emailResult.isRight()).toBeTruthy()
  })

  it('should reject invalid email address', () => {
    const emailResult1 = Email.create('invalid')
    const emailResult2 = Email.create('invalid@email')
    const emailResult3 = Email.create('@email.com')
    const emailResult4 = Email.create('invalid@email.')

    expect(emailResult1.isLeft()).toBeTruthy()
    expect(emailResult2.isLeft()).toBeTruthy()
    expect(emailResult3.isLeft()).toBeTruthy()
    expect(emailResult4.isLeft()).toBeTruthy()
  })

  it('should reject emails with more than 320 characters', () => {
    const domain = 'e'.repeat(340)
    const value = `valid@${domain}.com`

    const emailResult = Email.create(value)

    expect(emailResult).toEqual(
      left(new MaxLengthViolation('email', value, 320))
    )
  })
})
