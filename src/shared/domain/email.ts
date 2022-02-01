import { ValueObject } from '@shared/core/domain/value-object'
import { Violation } from '@shared/core/errors/violation'
import { Guard } from '@shared/core/logic/guard'
import { Either, right, left } from '@shared/core/logic/either'

import { RequiredViolation } from '@shared/errors/violations/required.violation'
import { MaxLengthViolation } from '@shared/errors/violations/max-length.violation'
import { InvalidEmailViolation } from '@shared/errors/violations/invalid-email.violation'

interface EmailProperties {
  value: string
}

export class Email extends ValueObject<EmailProperties> {
  public get value(): string {
    return this.properties.value
  }

  private constructor(properties: EmailProperties) {
    super(properties)
  }

  private static format(data: string): string {
    return data.trim().toLowerCase()
  }

  private static isValidEmail(data: string): boolean {
    const tester = /^[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/
    return tester.test(data)
  }

  public static create(data: string): Either<Violation, Email> {
    const value = this.format(data)

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

    return right(new Email({ value }))
  }
}
