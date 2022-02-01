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

  private static format(data: string): string {
    return data.trim()
  }

  public static create(data: string): Either<Violation, Name> {
    const value = this.format(data)

    if (Guard.againstNullOrUndefined(value).fail) {
      return left(new RequiredViolation('name', value))
    }

    if (Guard.inRange(value.length, 2, 32).fail) {
      return left(new BadLengthViolation('name', value, 2, 32))
    }

    return right(new Name({ value }))
  }
}
