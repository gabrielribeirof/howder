import { User } from '../domain/user/user'
import { UserDTO } from '../dtos/user.dto'
import { UserEntity } from '@shared/infra/typeorm/entities/user.entity'

export class UserMapper {
  public static toDTO(user: User): UserDTO {
    return {
      id: user.id.value,
      name: user.name.value,
      email: user.email.value
    }
  }

  public static toDomain(user: UserEntity): User {
    const result = User.create({
      name: user.name,
      email: user.email
    })

    if (result.isLeft()) throw new Error('Error on UserMapper.toDomain()')

    return result.value
  }

  public static toPersistence(user: User): UserEntity {
    const u = new UserEntity()

    u.id = user.id.value
    u.name = user.name.value
    u.email = user.email.value

    return u
  }
}
