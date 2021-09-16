import { AggregateRoot } from '@shared/core/domain/aggregate-root'
import { Identifier } from '@shared/core/domain/identifier'
import { DomainError } from '@shared/core/errors/domain-error'

import { Either, left, right, combine } from '@shared/core/logic/either'

import { Name } from './name'
import { Email } from './email'

interface IUserProps {
  name: Name
  email: Email
}

interface ICreateUserProps {
  name: string,
  email: string
}

export class User extends AggregateRoot<IUserProps> {
  public get name(): Name {
    return this.props.name
  }

  public get email(): Email {
    return this.props.email
  }

  private constructor(props: IUserProps, id?: Identifier) {
    super(props, id)
  }

  public static create(props: ICreateUserProps, id?: Identifier): Either<DomainError[], User> {
    const name = Name.create({ value: props.name })
    const email = Email.create({ value: props.email })

    const result = combine([name, email])

    if (result.isLeft()) {
      return left(result.value)
    }

    return right(new User({
      name: name.value as Name,
      email: email.value as Email
    }, id))
  }
}
