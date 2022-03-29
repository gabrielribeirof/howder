import { Violation } from '@shared/core/errors/violation'
import { Identifier } from '@shared/core/domain/identifier'
import { Either, left, combineLefts } from '@shared/core/logic/either'

import { User } from '../user'
import { Name } from '@shared/domain/name'
import { Email } from '@shared/domain/email'

type CreateUserRequest = {
  id?: string
  name: string
  email: string
  workspace_id: string
}

export function createUser(properties: CreateUserRequest): Either<Violation[], User> {
  const id = properties.id ? new Identifier(properties.id) : undefined
  const name = Name.create({ value: properties.name })
  const email = Email.create({ value: properties.email })
  const workspace_id = new Identifier(properties.workspace_id)

  if (name.isLeft() || email.isLeft()) {
    return left(combineLefts(name, email))
  }

  return User.create({
    name: name.value,
    email: email.value,
    workspace_id
  }, id)
}
