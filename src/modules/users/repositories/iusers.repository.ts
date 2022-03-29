import { User } from '../domain/user/user'

export interface IUsersRepository {
  findById(id: string): Promise<User | undefined>
  findByWorkspaceId(workspace_id: string): Promise<User[] | undefined>
  save(user: User): Promise<void>
}
