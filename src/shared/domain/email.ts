import { Violation } from '@shared/core/errors/violation'
import { Guard } from '@shared/core/logic/guard'
import { Either, right, left } from '@shared/core/logic/either'

import { RequiredViolation } from '@shared/errors/violations/required.violation'
import { MaxLengthViolation } from '@shared/errors/violations/max-length.violation'
import { InvalidEmailViolation } from '@shared/errors/violations/invalid-email.violation'

export class Email {
  public readonly value: string

  private constructor(email: string) {
    this.value = email
  }

  private static format(email: string): string {
    return email.trim().toLowerCase()
  }

  private static isValidEmail(email: string): boolean {
    const tester = /^[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/
    return tester.test(email)
  }

  public static create(email: string): Either<Violation, Email> {
    const value = this.format(email)

    const nullOrUndefinedGuard = Guard.againstNullOrUndefined(value)
    if (!nullOrUndefinedGuard.succeeded) {
      return left(new RequiredViolation('email', value))
    }

    const lengthGuard = Guard.atMost(320, value.length)
    if (!lengthGuard.succeeded) {
      return left(new MaxLengthViolation('email', value, 320))
    }

    if (!this.isValidEmail(value)) {
      return left(new InvalidEmailViolation(value))
    }

    return right(new Email(value))
  }
}
