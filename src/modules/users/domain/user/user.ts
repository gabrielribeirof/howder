import { AggregateRoot } from '@shared/core/domain/aggregate-root'
import { Identifier } from '@shared/core/domain/identifier'
import { Violation } from '@shared/core/errors/violation'
import { Either, left, right, combineLefts } from '@shared/core/logic/either'

import { Name } from '@shared/domain/name'
import { Email } from '@shared/domain/email'

interface UserProperties {
  name: Name
  email: Email
}

interface UserData {
  name: string,
  email: string
}

export class User extends AggregateRoot<UserProperties> {
  public readonly name: Name
  public readonly email: Email

  private constructor(props: UserProperties, id?: Identifier) {
    super(id)
    this.name = props.name
    this.email = props.email
  }

  public static create(props: UserData, id?: Identifier): Either<Violation[], User> {
    const nameOrError = Name.create(props.name)
    const emailOrError = Email.create(props.email)

    if (nameOrError.isLeft() || emailOrError.isLeft()) {
      return left(combineLefts(nameOrError, emailOrError))
    }

    return right(new User({
      name: nameOrError.value,
      email: emailOrError.value
    }, id))
  }
}
