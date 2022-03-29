import { User } from '@modules/users/domain/user/user'
import { IUsersRepository } from '../iusers.repository'

export class InMemoryUsersRepository implements IUsersRepository {
  public users: User[] = []

  public async findById(id: string): Promise<User | undefined> {
    return this.users.find(user => user.id.value === id)
  }

  public async findByWorkspaceId(workspace_id: string): Promise<User[] | undefined> {
    return this.users.filter(arrayUser => arrayUser.workspace_id.value === workspace_id)
  }

  public async save(user: User): Promise<void> {
    const index = this.users.findIndex(arrayUser => arrayUser.id.equals(user.id))

    if (index >= 0) {
      this.users[index] = user
      return
    }

    this.users.push(user)
  }
}
