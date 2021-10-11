import { ValueObject } from '@shared/core/domain/value-object'
import { DomainError } from '@shared/core/errors/domain-error'

import { Either, right, left } from '@shared/core/logic/either'
import { Guard } from '@shared/core/logic/guard'

import { RequiredError } from '@shared/core/errors/domain/required.error'
import { MaxLengthError } from '@shared/core/errors/domain/max-length.error'
import { InvalidEmailError } from '@shared/core/errors/domain/invalid-email.error'

interface IEmailProps {
  value: string
}

export class Email extends ValueObject<IEmailProps> {
  public get value(): string {
    return this.props.value
  }

  private constructor(props: IEmailProps) {
    super(props)
  }

  private static format(props: IEmailProps): IEmailProps {
    return {
      value: props.value.trim().toLowerCase()
    }
  }

  private static isValidEmail(email: string): boolean {
    const tester = /^[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/
    return tester.test(email)
  }

  public static create(props: IEmailProps): Either<DomainError, Email> {
    const { value } = this.format(props)

    const nullOrUndefinedGuard = Guard.againstNullOrUndefined(value)
    if (!nullOrUndefinedGuard.succeeded) {
      return left(new RequiredError('email', value))
    }

    const lengthGuard = Guard.atMost(320, value)
    if (!lengthGuard.succeeded) {
      return left(new MaxLengthError('email', value, 320))
    }

    if (!this.isValidEmail(value)) {
      return left(new InvalidEmailError(value))
    }

    return right(new Email({ value }))
  }
}
