import { User } from '../domain/user/user'
import { Name } from '../domain/user/name'
import { Email } from '../domain/user/email'

export interface IUsersRepository {
  findById(id: string): Promise<User | undefined>
  findByName(name: Name): Promise<User | undefined>
  findByEmail(email: Email): Promise<User | undefined>
  save(user: User): Promise<User>
}
