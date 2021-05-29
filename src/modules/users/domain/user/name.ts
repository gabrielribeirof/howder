import { Either, right, left } from '@shared/core/result'
import { Guard } from '@shared/core/guard'
import { DomainError } from '@shared/domain/errors/contracts/domain-error'

import { RequiredError } from '@shared/domain/errors/required.error'
import { BadLengthError } from '@shared/domain/errors/bad-length.error'

export class Name {
  private readonly name: string

  private constructor(name: string) {
    this.name = name
    Object.freeze(this)
  }

  private static format(name: string): string {
    return name.trim()
  }

  public static create(name: string): Either<DomainError, Name> {
    name = this.format(name)

    const nullOrUndefinedResult = Guard.againstNullOrUndefined(name)
    if (!nullOrUndefinedResult.succeeded) {
      return left(new RequiredError('name', name))
    }

    const lengthResult = Guard.inRange(name.length, 2, 32)
    if (!lengthResult.succeeded) {
      return left(new BadLengthError('name', name, 2, 32))
    }

    return right(new Name(name))
  }
}
