import { Repository, getRepository } from 'typeorm'

import { User } from '@modules/users/domain/user/user'
import { UserMapper } from '@modules/users/mappers/user.mapper'
import { UserEntity } from '@shared/infra/typeorm/entities/user.entity'

import { IUsersRepository } from '../iusers.repository'

export class TypeORMUsersRepository implements IUsersRepository {
  private ormRepository: Repository<UserEntity>

  constructor() {
    this.ormRepository = getRepository(UserEntity)
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne(id)

    return user && UserMapper.toDomain(user)
  }

  public async findByWorkspaceId(workspace_id: string): Promise<User[] | undefined> {
    const user = await this.ormRepository.find({
      where: { workspace_id }
    })

    return user && user.map(u => UserMapper.toDomain(u))
  }

  public async save(user: User): Promise<void> {
    const toPersistence = UserMapper.toPersistence(user)
    const created = this.ormRepository.create(toPersistence)

    await this.ormRepository.save(created)
  }
}
