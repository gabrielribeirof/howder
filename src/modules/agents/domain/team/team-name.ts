import { ValueObject } from '@shared/core/domain/value-object'
import { Violation } from '@shared/core/errors/violation'
import { Guard } from '@shared/core/logic/guard'
import { Either, left, right } from '@shared/core/logic/either'

import { RequiredViolation } from '@shared/errors/violations/required.violation'
import { BadLengthViolation } from '@shared/errors/violations/bad-length.violation'

interface TeamNameProperties {
  value: string
}

export class TeamName extends ValueObject<TeamNameProperties> {
  public get value(): string {
    return this.properties.value
  }

  private constructor(properties: TeamNameProperties) {
    super(properties)
  }

  private static format(data: string): string {
    return data.trim()
  }

  public static create(data: string): Either<Violation, TeamName> {
    const value = this.format(data)

    if (Guard.againstNullOrUndefined(value).fail) {
      return left(new RequiredViolation('name', value))
    }

    if (Guard.inRange(value.length, 2, 32).fail) {
      return left(new BadLengthViolation('name', value, 2, 32))
    }

    return right(new TeamName({ value }))
  }
}
