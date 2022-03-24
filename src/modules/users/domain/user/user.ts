import { AggregateRoot } from '@shared/core/domain/aggregate-root'
import { Identifier } from '@shared/core/domain/identifier'
import { Violation } from '@shared/core/errors/violation'
import { Either, right } from '@shared/core/logic/either'

import { Name } from '@shared/domain/name'
import { Email } from '@shared/domain/email'

interface UserProperties {
  name: Name
  email: Email
  workspace_id: Identifier
}

export class User extends AggregateRoot<UserProperties> {
  public get name(): Name {
    return this.properties.name
  }

  public get email(): Email {
    return this.properties.email
  }

  public get workspace_id(): Identifier {
    return this.properties.workspace_id
  }

  private constructor(properties: UserProperties, id?: Identifier) {
    super(properties, id)
  }

  public static create(properties: UserProperties, id?: Identifier): Either<Violation[], User> {
    return right(new User({
      name: properties.name,
      email: properties.email,
      workspace_id: properties.workspace_id
    }, id))
  }
}
