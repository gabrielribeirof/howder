import { User } from '../domain/user/user'

export interface IUsersRepository {
  findById(id: string): Promise<User | undefined>
  findByName(name: string): Promise<User | undefined>
  findByEmail(email: string): Promise<User | undefined>
  save(user: User): Promise<User>
}
