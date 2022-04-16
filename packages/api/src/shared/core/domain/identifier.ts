import { v4 as uuidv4, validate } from 'uuid'
import { Violation } from '../errors/violation'
import { Either, left, right } from '../logic/either'

import { WrongIDViolation } from '@shared/errors/violations/wrong-id.violation'

export class Identifier {
  public readonly value: string;

  private constructor(id?: string) {
    this.value = id || uuidv4()
  }

  public equals(id: Identifier): boolean {
    return id.value === this.value
  }

  public static generate(): Identifier {
    return new Identifier()
  }

  public static create(id: string, fieldName?: string): Either<Violation, Identifier> {
    if (!id) {
      return right(new Identifier())
    }

    if (validate(id)) {
      return right(new Identifier(id))
    }

    return left(new WrongIDViolation(fieldName || '', id))
  }
}
