import bcrypt from 'bcryptjs'
import { Password } from './password'

const genericPasswordResult = Password.create({ value: '123456', hashed: false })

describe('Agent password value object', () => {
  it('should accept valid password', () => {
    expect(genericPasswordResult.isRight()).toBeTruthy()
  })

  it('should reject password with less than 6 characters', () => {
    const passwordResult = Password.create({ value: '12345', hashed: false })

    expect(passwordResult.isLeft()).toBeTruthy()
  })

  it('should reject password with more than 128 characters', () => {
    const passwordResult = Password.create({
      value: '1'.repeat(200),
      hashed: false
    })

    expect(passwordResult.isLeft()).toBeTruthy()
  })

  it('should be able to hash the password', async () => {
    if (genericPasswordResult.isLeft()) {
      throw new Error()
    }

    const hashedPassword = await genericPasswordResult.value.getHashedValue()

    expect(await bcrypt.compare('123456', hashedPassword)).toBeTruthy()
  })

  it('should not hash the password when already hashed', async () => {
    const hashedPassword = await bcrypt.hash('123456', 8)
    const passwordResult = Password.create({ value: hashedPassword, hashed: true })

    if (passwordResult.isLeft()) {
      throw new Error()
    }

    expect(await passwordResult.value.getHashedValue()).toEqual(hashedPassword)
  })

  it('should be able to compare the password when not hashed', () => {
    if (genericPasswordResult.isLeft()) {
      throw new Error()
    }

    expect(genericPasswordResult.value.comparePassword('123456')).toBeTruthy()
  })

  it('should be able to compare the password when hashed', async () => {
    const hashedPassword = await bcrypt.hash('123456', 8)
    const passwordResult = Password.create({ value: hashedPassword, hashed: true })

    if (passwordResult.isLeft()) {
      throw new Error()
    }

    expect(passwordResult.value.comparePassword('123456')).toBeTruthy()
  })
})
