import { Violation } from '@shared/core/errors/violation'
import { Identifier } from '@shared/core/domain/identifier'
import { Either, left, combineLefts } from '@shared/core/logic/either'

import { Agent } from '../agent'
import { Name } from '@shared/domain/name'
import { Email } from '@shared/domain/email'
import { Password } from '../password'

type CreateAgentRequest = {
  name: string
  email: string
  password: string
}

export function createAgent(properties: CreateAgentRequest): Either<Violation[], Agent> {
  const name = Name.create({ value: properties.name })
  const email = Email.create({ value: properties.email })
  const password = Password.create({
    value: properties.password,
    hashed: false
  })

  if (name.isLeft() || email.isLeft() || password.isLeft()) {
    return left(combineLefts(name, email, password))
  }

  return Agent.create({
    name: name.value,
    email: email.value,
    password: password.value
  })
}
