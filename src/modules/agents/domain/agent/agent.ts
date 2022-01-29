import { AggregateRoot } from '@shared/core/domain/aggregate-root'
import { Identifier } from '@shared/core/domain/identifier'
import { Violation } from '@shared/core/errors/violation'
import { combineLefts, Either, left, right } from '@shared/core/logic/either'

import { Name } from '@shared/domain/name'
import { Email } from '@shared/domain/email'
import { Password } from './password'

interface AgentProps {
  name: Name
  email: Email
  password: Password
  admin: boolean
}

interface AgentData {
  name: string
  email: string
  password: string
  admin: boolean
}

export class Agent extends AggregateRoot<AgentProps> {
  public readonly name: Name
  public readonly email: Email
  public readonly password: Password
  public readonly admin: boolean

  private constructor(props: AgentProps, id?: Identifier) {
    super(id)
    this.name = props.name
    this.email = props.email
    this.password = props.password
    this.admin = props.admin
  }

  public static create(props: AgentData, id?: Identifier): Either<Violation[], Agent> {
    const nameOrError = Name.create(props.name)
    const emailOrError = Email.create(props.email)
    const passwordOrError = Password.create({ value: props.password })

    if (nameOrError.isLeft() || emailOrError.isLeft() || passwordOrError.isLeft()) {
      return left(combineLefts(nameOrError, emailOrError, passwordOrError))
    }

    return right(new Agent({
      name: nameOrError.value,
      email: emailOrError.value,
      password: passwordOrError.value,
      admin: props.admin
    }, id))
  }
}
