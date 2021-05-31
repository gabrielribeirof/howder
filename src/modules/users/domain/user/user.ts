import { DomainError } from '@shared/domain/errors/contracts/domain-error'
import { Either, DomainResult, left, right } from '@shared/core/result'

import { Email } from './email'
import { Name } from './name'

interface UserProps {
  name: string
  email: string
}

export class User {
  readonly name: Name
  readonly email: Email

  private constructor(name: Name, email: Email) {
    this.name = name
    this.email = email
  }

  public static create(props: UserProps): Either<DomainError[], User> {
    const nameOrError = Name.create(props.name)
    const emailOrError = Email.create(props.email)

    const result = DomainResult.combine([nameOrError, emailOrError])

    if (result.isLeft()) {
      return left(result.value)
    }

    const name = nameOrError.value as Name
    const email = emailOrError.value as Email
    return right(new User(name, email))
  }
}
