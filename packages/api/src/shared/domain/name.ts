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
    return this.properties.value
  }

  private constructor(properties: NameProperties) {
    super(properties)
  }

  private static format(properties: NameProperties): NameProperties {
    return {
      value: properties.value.trim()
    }
  }

  public static create(properties: NameProperties): Either<Violation, Name> {
    const { value } = this.format({ value: properties.value })

    if (Guard.againstNullOrUndefined(value).fail) {
      return left(new RequiredViolation('name', value))
    }

    if (Guard.inRange(value.length, 2, 32).fail) {
      return left(new BadLengthViolation('name', value, 2, 32))
    }

    return right(new Name({ value }))
  }
}
