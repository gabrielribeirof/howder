import { User } from './user'

describe('User aggregate root', () => {
  it('should create new user', async () => {
    const user = User.create({
      name: 'John Doe',
      email: 'valid@email.com'
    })

    expect(user.isRight()).toBeTruthy()
  })
})
