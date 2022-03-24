import { ValueObject } from '@shared/core/domain/value-object'
import { Violation } from '@shared/core/errors/violation'
import { Either, left, right } from '@shared/core/logic/either'

import { ChoicesViolation } from '@shared/errors/violations/choices.violation'

export type AuthorTypeValue = 'user' | 'member'

interface AuthorTypeProperties {
  value: AuthorTypeValue
}

export class AuthorType extends ValueObject<AuthorTypeProperties> {
  public get value(): AuthorTypeValue {
    return this.properties.value
  }

  private constructor(properties: AuthorTypeProperties) {
    super(properties)
  }

  public isUser(): boolean {
    return this.value === 'user'
  }

  public isMember(): boolean {
    return this.value === 'member'
  }

  public static create({ value }: AuthorTypeProperties): Either<Violation, AuthorType> {
    if (value === 'user' || value === 'member') {
      return right(new AuthorType({ value: value }))
    }

    return left(new ChoicesViolation('author_type', value, ['user', 'member']))
  }
}
