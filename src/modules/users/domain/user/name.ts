import { ValueObject } from '@shared/core/domain/value-object'
import { DomainError } from '@shared/core/errors/domain-error'

import { Either, right, left } from '@shared/core/logic/either'
import { Guard } from '@shared/core/logic/guard'

import { RequiredError } from '@shared/core/errors/domain/required.error'
import { BadLengthError } from '@shared/core/errors/domain/bad-length.error'

interface INameProps {
  value: string
}

export class Name extends ValueObject<INameProps> {
  public get value(): string {
    return this.props.value
  }

  private constructor(props: INameProps) {
    super(props)
  }

  private static format(props: INameProps): INameProps {
    return {
      value: props.value.trim()
    }
  }

  public static create(props: INameProps): Either<DomainError, Name> {
    const { value } = this.format(props)

    const nullOrUndefinedGuard = Guard.againstNullOrUndefined(value)
    if (!nullOrUndefinedGuard.succeeded) {
      return left(new RequiredError('name', value))
    }

    const lengthGuard = Guard.inRange(value.length, 2, 32)
    if (!lengthGuard.succeeded) {
      return left(new BadLengthError('name', value, 2, 32))
    }

    return right(new Name({ value }))
  }
}
