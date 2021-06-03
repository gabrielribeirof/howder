import { ValueObject } from '@shared/domain/value-object'
import { DomainError } from '@shared/domain/errors/contracts/domain-error'

import { Either, right, left } from '@shared/core/either'
import { Guard } from '@shared/core/guard'

import { RequiredError } from '@shared/domain/errors/required.error'
import { MaxLengthError } from '@shared/domain/errors/max-length.error'
import { InvalidEmailError } from '@shared/domain/errors/invalid-email.error'

interface EmailProps {
  value: string
}

export class Email extends ValueObject<EmailProps> {
  private constructor(props: EmailProps) {
    super(props)
  }

  public get value(): string {
    return this.props.value
  }

  public static create(props: EmailProps): Either<DomainError, Email> {
    const { value } = this.format(props)

    const nullOrUndefinedResult = Guard.againstNullOrUndefined(value)
    if (!nullOrUndefinedResult.succeeded) {
      return left(new RequiredError('email', value))
    }

    const lengthResult = Guard.againstAtMost(320, value)
    if (!lengthResult.succeeded) {
      return left(new MaxLengthError('email', value, 320))
    }

    if (!this.isValidEmail(value)) {
      return left(new InvalidEmailError(value))
    }

    return right(new Email({ value }))
  }

  private static format(props: EmailProps): EmailProps {
    return {
      value: props.value.trim().toLowerCase()
    }
  }

  private static isValidEmail(email: string): boolean {
    const tester = /^[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/
    return tester.test(email)
  }
}
