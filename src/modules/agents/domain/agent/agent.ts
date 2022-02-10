import { AggregateRoot } from '@shared/core/domain/aggregate-root'
import { Identifier } from '@shared/core/domain/identifier'
import { Violation } from '@shared/core/errors/violation'
import { combineLefts, Either, left, right } from '@shared/core/logic/either'

import { AgentData } from './agent-data'

import { Name } from '@shared/domain/name'
import { Email } from '@shared/domain/email'
import { Password } from './password'

interface AgentProperties {
  name: Name
  email: Email
  password: Password
  is_admin: boolean
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

  public get is_admin(): boolean {
    return this.properties.is_admin
  }

  private constructor(properties: AgentProperties, id?: Identifier) {
    super(properties, id)
  }

  public static create(data: AgentData, id?: Identifier): Either<Violation[], Agent> {
    const nameResult = Name.create(data.name)
    const emailResult = Email.create(data.email)
    const passwordResult = Password.create({
      value: data.password.value,
      hashed: data.password.hashed
    })

    if (nameResult.isLeft() || emailResult.isLeft() || passwordResult.isLeft()) {
      return left(combineLefts(nameResult, emailResult, passwordResult))
    }

    return right(new Agent({
      name: nameResult.value,
      email: emailResult.value,
      password: passwordResult.value,
      is_admin: data.is_admin
    }, id))
  }
}
