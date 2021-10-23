import { User } from '@modules/users/domain/user/user'
import { UserEntity } from '@shared/infra/database/entities/user.entity'
import { UserMapper } from '@modules/users/mappers/user.mapper'

import { IUsersRepository } from '@modules/users/repositories/iuser.repository'

export class FakeUsersRepository implements IUsersRepository {
  private users: UserEntity[] = []

  public async findById(id: string): Promise<User | undefined> {
    const user = this.users.find(user => user.id === id)

    return user ? UserMapper.toDomain(user) : undefined
  }

  public async findByName(name: string): Promise<User | undefined> {
    const user = this.users.find(user => user.name === name)

    return user ? UserMapper.toDomain(user) : undefined
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = this.users.find(user => user.email === email)

    return user ? UserMapper.toDomain(user) : undefined
  }

  public async save(user: User): Promise<User> {
    const userAlreadyRegistered = this.users.find(arrayUser => arrayUser.id === user.id.value)

    if (userAlreadyRegistered) {
      return UserMapper.toDomain(userAlreadyRegistered)
    }

    const toPersistenceUser = UserMapper.toPersistence(user)

    this.users.push(toPersistenceUser)

    return UserMapper.toDomain(toPersistenceUser)
  }
}
