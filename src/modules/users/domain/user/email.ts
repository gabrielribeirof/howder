import { DomainError } from '@shared/domain/errors/contracts/domain-error'
import { Either, right, left } from '@shared/core/either'
import { Guard } from '@shared/core/guard'

import { RequiredError } from '@shared/domain/errors/required.error'
import { MaxLengthError } from '@shared/domain/errors/max-length.error'
import { InvalidEmailError } from '@shared/domain/errors/invalid-email.error'

export class Email {
  private readonly value: string

  private constructor(email: string) {
    this.value = email
    Object.freeze(this)
  }

  private static format(email: string): string {
    return email.trim().toLowerCase()
  }

  private static isValidEmail(email: string): boolean {
    const tester = /^[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/
    return tester.test(email)
  }

  public static create(email: string): Either<DomainError, Email> {
    email = this.format(email)

    const nullOrUndefinedResult = Guard.againstNullOrUndefined(email)
    if (!nullOrUndefinedResult.succeeded) {
      return left(new RequiredError('email', email))
    }

    const lengthResult = Guard.againstAtMost(320, email)
    if (!lengthResult.succeeded) {
      return left(new MaxLengthError('email', email, 320))
    }

    if (!this.isValidEmail(email)) {
      return left(new InvalidEmailError(email))
    }

    return right(new Email(email))
  }
}
