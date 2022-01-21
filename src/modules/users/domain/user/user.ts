import { AggregateRoot } from '@shared/core/domain/aggregate-root'
import { Identifier } from '@shared/core/domain/identifier'
import { Violation } from '@shared/core/errors/violation'
import { Either, left, right, combineLefts } from '@shared/core/logic/either'

import { Name } from './name'
import { Email } from './email'

interface UserProps {
  name: Name
  email: Email
}

interface CreateUserProps {
  name: string,
  email: string
}

export class User extends AggregateRoot<UserProps> {
  public get name(): Name {
    return this.props.name
  }

  public get email(): Email {
    return this.props.email
  }

  private constructor(props: UserProps, id?: Identifier) {
    super(props, id)
  }

  public static create(props: CreateUserProps, id?: Identifier): Either<Violation[], User> {
    const nameOrError = Name.create({ value: props.name })
    const emailOrError = Email.create({ value: props.email })

    if (nameOrError.isLeft() || emailOrError.isLeft()) {
      return left(combineLefts(nameOrError, emailOrError))
    }

    return right(new User({
      name: nameOrError.value,
      email: emailOrError.value
    }, id))
  }
}
