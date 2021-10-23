import { Repository, getRepository } from 'typeorm'

import { User } from '@modules/users/domain/user/user'
import { UserEntity } from '@shared/infra/database/entities/user.entity'
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

  public async findByName(name: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: { name }
    })

    return user ? UserMapper.toDomain(user) : undefined
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: { email }
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
