import { Repository, getRepository } from 'typeorm'

import { User } from '@modules/users/domain/user/user'
import { Name } from '@modules/users/domain/user/name'
import { Email } from '@modules/users/domain/user/email'

import { UserEntity } from '@shared/infra/typeorm/entities/user.entity'
import { UserMapper } from '@modules/users/mappers/user.mapper'

import { IUsersRepository } from '@modules/users/repositories/iuser.repository'

export class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<UserEntity>;

  constructor() {
    this.ormRepository = getRepository(UserEntity)
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne(id)

    return user ? UserMapper.toDomain(user) : undefined
  }

  public async findByName(name: Name): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: { name: name.value }
    })

    return user ? UserMapper.toDomain(user) : undefined
  }

  public async findByEmail(email: Email): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: { email: email.value }
    })

    return user ? UserMapper.toDomain(user) : undefined
  }

  public async save(user: User): Promise<User> {
    const toPersistenceUser = UserMapper.toPersistence(user)
    const createdUser = this.ormRepository.create(toPersistenceUser)

    await this.ormRepository.save(createdUser)

    return UserMapper.toDomain(toPersistenceUser)
  }
}
