import { left } from '@shared/core/logic/either'
import { MaxLengthViolation } from '@shared/errors/violations/max-length.violation'

import { Email } from './email'

describe('Email value object', () => {
  it('should accept valid email address', () => {
    const email = Email.create({ value: 'valid@email.com' })

    expect(email.isRight()).toBeTruthy()
  })

  it('should reject invalid email address', () => {
    const email1 = Email.create({ value: 'invalid' })
    const email2 = Email.create({ value: 'invalid@email' })
    const email3 = Email.create({ value: '@email.com' })
    const email4 = Email.create({ value: 'invalid@email.' })

    expect(email1.isLeft()).toBeTruthy()
    expect(email2.isLeft()).toBeTruthy()
    expect(email3.isLeft()).toBeTruthy()
    expect(email4.isLeft()).toBeTruthy()
  })

  it('should reject emails with more than 320 characters', () => {
    const domain = 'e'.repeat(340)
    const value = `valid@${domain}.com`

    const emailResult = Email.create({ value })

    expect(emailResult).toEqual(
      left(new MaxLengthViolation('email', value, 320))
    )
  })
})
