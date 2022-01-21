import { ValueObject } from '@shared/core/domain/value-object'
import { Violation } from '@shared/core/errors/violation'
import { Guard } from '@shared/core/logic/guard'
import { Either, right, left } from '@shared/core/logic/either'

import { RequiredViolation } from '@shared/errors/violations/required.violation'
import { BadLengthViolation } from '@shared/errors/violations/bad-length.violation'

interface NameProperties {
  value: string
}

export class Name extends ValueObject<NameProperties> {
  public get value(): string {
    return this.props.value
  }

  private constructor(props: NameProperties) {
    super(props)
  }

  private static format(props: NameProperties): NameProperties {
    return {
      value: props.value.trim()
    }
  }

  public static create(props: NameProperties): Either<Violation, Name> {
    const { value } = this.format(props)

    const nullOrUndefinedGuard = Guard.againstNullOrUndefined(value)
    if (!nullOrUndefinedGuard.succeeded) {
      return left(new RequiredViolation('name', value))
    }

    const lengthGuard = Guard.inRange(value.length, 2, 32)
    if (!lengthGuard.succeeded) {
      return left(new BadLengthViolation('name', value, 2, 32))
    }

    return right(new Name({ value }))
  }
}
