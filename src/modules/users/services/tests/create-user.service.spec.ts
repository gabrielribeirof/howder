import { User } from '@modules/users/domain/user/user'
import { CreateUserService } from '@modules/users/services/create-user.service'
import { FakeUsersRepository } from '@modules/users/repositories/fakes/fake-users.repository'

import { EmailAlreadyRegisteredError } from '@shared/core/errors/services/email-already-registered.error'

let fakeUsersRepository: FakeUsersRepository
let createUser: CreateUserService

describe('CreateUserService', () => {
  beforeAll(() => {
    fakeUsersRepository = new FakeUsersRepository()

    createUser = new CreateUserService(fakeUsersRepository)
  })

  it('should be able to create a new user', async () => {
    const createdUser = await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@example.com'
    })

    expect(createdUser.isRight()).toBeTruthy()
  })

  it('should not be able to create a new user with invalid data', async () => {
    const createdUser = await createUser.execute({
      name: 'John Doe',
      email: 'johndoe'
    })

    expect(createdUser.isLeft()).toBeTruthy()
  })

  it('should not be able to register new user with existing email', async () => {
    const user = User.create({
      name: 'John Doe',
      email: 'johndoe@example.com'
    })

    user.isRight() && fakeUsersRepository.save(user.value)

    const createdUser = await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@example.com'
    })

    expect(createdUser.isLeft()).toBeTruthy()
    expect(createdUser.value).toEqual([
      new EmailAlreadyRegisteredError('johndoe@example.com')
    ])
  })
})
