import { User } from '../domain/user/user'

import { UserEntity } from '@shared/infra/database/entities/user.entity'

export class UserMapper {
  public static toDomain(user: UserEntity): User {
    const result = User.create({
      name: user.name,
      email: user.email
    })

    if (result.isLeft()) throw new Error('Error on UserMapper.toDomain()')

    return result.value
  }

  public static toPersistence(user: User): UserEntity {
    return {
      id: user.id.value,
      name: user.name.value,
      email: user.email.value
    }
  }
}
