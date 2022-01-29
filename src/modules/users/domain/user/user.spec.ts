import { User } from './user'

describe('User aggregate root', () => {
  it('should be able to create new user', async () => {
    const userOrError = User.create({
      name: 'John Doe',
      email: 'valid@email.com'
    })

    expect(userOrError.isRight()).toBeTruthy()
  })
})
