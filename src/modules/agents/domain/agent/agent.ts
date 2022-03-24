import { AggregateRoot } from '@shared/core/domain/aggregate-root'
import { Identifier } from '@shared/core/domain/identifier'
import { Violation } from '@shared/core/errors/violation'
import { Either, right } from '@shared/core/logic/either'

import { Name } from '@shared/domain/name'
import { Email } from '@shared/domain/email'
import { Password } from './password'

interface AgentProperties {
  name: Name
  email: Email
  password: Password
}

export class Agent extends AggregateRoot<AgentProperties> {
  public get name(): Name {
    return this.properties.name
  }

  public get email(): Email {
    return this.properties.email
  }

  public get password(): Password {
    return this.properties.password
  }

  private constructor(properties: AgentProperties, id?: Identifier) {
    super(properties, id)
  }

  public static create(properties: AgentProperties, id?: Identifier): Either<Violation[], Agent> {
    return right(new Agent({
      name: properties.name,
      email: properties.email,
      password: properties.password
    }, id))
  }
}
