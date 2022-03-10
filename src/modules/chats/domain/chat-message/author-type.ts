import { ValueObject } from '@shared/core/domain/value-object'
import { Violation } from '@shared/core/errors/violation'
import { Either, left, right } from '@shared/core/logic/either'

import { ChoicesViolation } from '@shared/errors/violations/choices.violation'

export type AuthorTypeValue = 'user' | 'agent'

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

  public isAgent(): boolean {
    return this.value === 'agent'
  }

  public static create(data: string): Either<Violation, AuthorType> {
    if (data === 'user' || data === 'agent') {
      return right(new AuthorType({ value: data }))
    }

    return left(new ChoicesViolation('author_type', data, ['user', 'agent']))
  }
}
