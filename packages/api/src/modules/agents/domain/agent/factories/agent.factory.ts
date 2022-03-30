import { Violation } from '@shared/core/errors/violation'
import { Identifier } from '@shared/core/domain/identifier'
import { Either, left, combineLefts } from '@shared/core/logic/either'

import { Agent } from '../agent'
import { Name } from '@shared/domain/name'
import { Email } from '@shared/domain/email'
import { Password } from '../password'

type CreateAgentRequest = {
  id?: string
  name: string
  email: string
  password: string
  isPasswordHashed?: boolean
}

export function createAgent(properties: CreateAgentRequest): Either<Violation[], Agent> {
  const id = properties.id ? new Identifier(properties.id) : undefined
  const name = Name.create({ value: properties.name })
  const email = Email.create({ value: properties.email })
  const password = Password.create({
    value: properties.password,
    hashed: properties.isPasswordHashed ?? false
  })

  if (name.isLeft() || email.isLeft() || password.isLeft()) {
    return left(combineLefts(name, email, password))
  }

  return Agent.create({
    name: name.value,
    email: email.value,
    password: password.value
  }, id)
}
