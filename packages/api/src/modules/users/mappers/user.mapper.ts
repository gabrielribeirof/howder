import { User } from '../domain/user/user'
import { UserDTO } from '../dtos/user.dto'
import { UserEntity } from '@infra/typeorm/entities/user.entity'
import { createUser } from '../domain/user/factories/user.factory'

export class UserMapper {
  public static toDTO(user: User): UserDTO {
    return {
      id: user.id.value,
      name: user.name.value,
      email: user.email.value,
      workspace_id: user.workspace_id.value
    }
  }

  public static toDomain(user: UserEntity): User {
    const result = createUser({
      id: user.id,
      name: user.name,
      email: user.email,
      workspace_id: user.workspace_id
    })

    if (result.isLeft()) throw new Error('Error on UserMapper.toDomain()')

    return result.value
  }

  public static toPersistence(user: User): UserEntity {
    const u = new UserEntity()

    u.id = user.id.value
    u.name = user.name.value
    u.email = user.email.value
    u.workspace_id = user.workspace_id.value

    return u
  }
}
