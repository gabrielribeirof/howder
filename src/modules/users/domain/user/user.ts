import { AggregateRoot } from '@shared/core/domain/aggregate-root'
import { Identifier } from '@shared/core/domain/identifier'
import { Violation } from '@shared/core/errors/violation'
import { Either, left, right, combineLefts } from '@shared/core/logic/either'

import { UserData } from './user-data'

import { Name } from '@shared/domain/name'
import { Email } from '@shared/domain/email'

interface UserProperties {
  name: Name
  email: Email
}

export class User extends AggregateRoot<UserProperties> {
  public get name(): Name {
    return this.properties.name
  }

  public get email(): Email {
    return this.properties.email
  }

  private constructor(properties: UserProperties, id?: Identifier) {
    super(properties, id)
  }

  public static create(data: UserData, id?: Identifier): Either<Violation[], User> {
    const nameResult = Name.create(data.name)
    const emailResult = Email.create(data.email)

    if (nameResult.isLeft() || emailResult.isLeft()) {
      return left(combineLefts(nameResult, emailResult))
    }

    return right(new User({
      name: nameResult.value,
      email: emailResult.value
    }, id))
  }
}
