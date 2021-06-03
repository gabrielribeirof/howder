import { ValueObject } from '@shared/domain/value-object'
import { DomainError } from '@shared/domain/errors/contracts/domain-error'

import { Either, right, left } from '@shared/core/either'
import { Guard } from '@shared/core/guard'

import { RequiredError } from '@shared/domain/errors/required.error'
import { BadLengthError } from '@shared/domain/errors/bad-length.error'

interface NameProps {
  value: string
}

export class Name extends ValueObject<NameProps> {
  private constructor(props: NameProps) {
    super(props)
  }

  public get value(): string {
    return this.props.value
  }

  public static create(props: NameProps): Either<DomainError, Name> {
    const { value } = this.format(props)

    const nullOrUndefinedResult = Guard.againstNullOrUndefined(value)
    if (!nullOrUndefinedResult.succeeded) {
      return left(new RequiredError('name', value))
    }

    const lengthResult = Guard.inRange(value.length, 2, 32)
    if (!lengthResult.succeeded) {
      return left(new BadLengthError('name', value, 2, 32))
    }

    return right(new Name({ value }))
  }

  private static format(props: NameProps): NameProps {
    return {
      value: props.value.trim()
    }
  }
}
