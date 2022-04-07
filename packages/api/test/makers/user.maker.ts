import { User } from '@modules/users/domain/user/user'
import { createUser } from '@modules/users/domain/user/factories/user.factory'

type UserOverrides = {
  workspace_id?: string
}

export function makeUser(overrides?: UserOverrides): User {
  const user = createUser({
    name: 'Joe Doe',
    email: 'joedoe@example.com',
    workspace_id: overrides?.workspace_id ?? 'workspace-id'
  })

  if (user.isLeft()) throw new Error()

  return user.value
}
