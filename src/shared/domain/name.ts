import { Violation } from '@shared/core/errors/violation'
import { Guard } from '@shared/core/logic/guard'
import { Either, right, left } from '@shared/core/logic/either'

import { RequiredViolation } from '@shared/errors/violations/required.violation'
import { BadLengthViolation } from '@shared/errors/violations/bad-length.violation'

export class Name {
  public readonly value: string

  private constructor(name: string) {
    this.value = name
  }

  private static format(name: string): string {
    return name.trim()
  }

  public static create(name: string): Either<Violation, Name> {
    const value = this.format(name)

    const nullOrUndefinedGuard = Guard.againstNullOrUndefined(value)
    if (!nullOrUndefinedGuard.succeeded) {
      return left(new RequiredViolation('name', value))
    }

    const lengthGuard = Guard.inRange(value.length, 2, 32)
    if (!lengthGuard.succeeded) {
      return left(new BadLengthViolation('name', value, 2, 32))
    }

    return right(new Name(value))
  }
}
