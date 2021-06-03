import { DomainError } from '@shared/domain/errors/contracts/domain-error'

import { Either, left, right, combine } from '@shared/core/either'

import { Email } from './email'
import { Name } from './name'

interface ICreateProps {
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

  public get value(): any {
    return {
      name: this.name.value,
      email: this.email.value
    }
  }

  public static create(props: ICreateProps): Either<DomainError[], User> {
    const nameOrError = Name.create({ value: props.name })
    const emailOrError = Email.create({ value: props.email })

    const result = combine([nameOrError, emailOrError])

    if (result.isLeft()) {
      return left(result.value)
    }

    const name = nameOrError.value as Name
    const email = emailOrError.value as Email
    return right(new User(name, email))
  }
}
