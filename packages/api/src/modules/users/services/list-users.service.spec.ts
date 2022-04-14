import { ListUsersService } from './list-users.service'

import { InMemoryUsersRepository } from '@modules/users/repositories/in-memory/in-memory-users.repository'
import { InMemoryMembersRespository } from '@modules/workspaces/repositories/in-memory/in-memory-members.repository'

import { UnauthorizedError } from '@shared/errors/unauthorized.error'

import { User } from '@modules/users/domain/user/user'
import { makeMember } from '@test/helpers/makers/member.maker'
import { makeUser } from '@test/helpers/makers/user.maker'

let usersRepository: InMemoryUsersRepository
let membersRepository: InMemoryMembersRespository

let sut: ListUsersService

describe('ListUsersService', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    membersRepository = new InMemoryMembersRespository()

    sut = new ListUsersService(usersRepository, membersRepository)
  })

  it('should get the requester workspace users', async () => {
    const member = makeMember({ workspace_id: 'workspace-id' })
    const users1 = makeUser({ workspace_id: 'workspace-id' })
    const users2 = makeUser({ workspace_id: 'workspace-id' })
    const users3 = makeUser({ workspace_id: 'workspace-id' })

    await membersRepository.save(member)
    await usersRepository.save(users1)
    await usersRepository.save(users2)
    await usersRepository.save(users3)

    const response = await sut.execute({
      workspace_id: 'workspace-id',
      requester_id: member.agent_id.value
    })

    expect(response.isRight()).toBeTruthy()
    expect(response.isRight() && response.value[0]).toBeInstanceOf(User)
  })

  it('should not get workspace users for an outside workspace member', async () => {
    const member = makeMember({ workspace_id: 'other-workspace-id' })
    const users1 = makeUser({ workspace_id: 'workspace-id' })
    const users2 = makeUser({ workspace_id: 'workspace-id' })
    const users3 = makeUser({ workspace_id: 'workspace-id' })

    await membersRepository.save(member)
    await usersRepository.save(users1)
    await usersRepository.save(users2)
    await usersRepository.save(users3)

    const response = await sut.execute({
      workspace_id: 'workspace-id',
      requester_id: member.agent_id.value
    })

    expect(response.isRight()).toBeFalsy()
    expect(response.value).toBeInstanceOf(UnauthorizedError)
  })
})
