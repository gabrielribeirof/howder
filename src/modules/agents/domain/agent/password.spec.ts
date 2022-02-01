import bcrypt from 'bcryptjs'
import { Password } from './password'

describe('Agent password value object', () => {
  it('should accept valid password', () => {
    const passwordOrError = Password.create({ value: '123456' })

    expect(passwordOrError.isRight()).toBeTruthy()
  })

  it('should reject password with less than 6 characters', () => {
    const passwordOrError = Password.create({ value: '12345' })

    expect(passwordOrError.isLeft()).toBeTruthy()
  })

  it('should reject password with more than 128 characters', () => {
    const passwordOrError = Password.create({ value: '1'.repeat(200) })

    expect(passwordOrError.isLeft()).toBeTruthy()
  })

  it('should be able to hash the password', async () => {
    const passwordOrError = Password.create({ value: '123456' })

    if (passwordOrError.isLeft()) {
      throw new Error()
    }

    const hashedPassword = await passwordOrError.value.getHashedValue()

    expect(await bcrypt.compare('123456', hashedPassword)).toBeTruthy()
  })

  it('should not hash the password when already hashed', async () => {
    const hashedPassword = await bcrypt.hash('123456', 8)
    const passwordOrError = Password.create({ value: hashedPassword, hashed: true })

    if (passwordOrError.isLeft()) {
      throw new Error()
    }

    expect(await passwordOrError.value.getHashedValue()).toEqual(hashedPassword)
  })

  it('should be able to compare the password when not hashed', () => {
    const passwordOrError = Password.create({ value: '123456' })

    if (passwordOrError.isLeft()) {
      throw new Error()
    }

    expect(passwordOrError.value.comparePassword('123456')).toBeTruthy()
  })

  it('should be able to compare the password when hashed', async () => {
    const hashedPassword = await bcrypt.hash('123456', 8)
    const passwordOrError = Password.create({ value: hashedPassword, hashed: true })

    if (passwordOrError.isLeft()) {
      throw new Error()
    }

    expect(passwordOrError.value.comparePassword('123456')).toBeTruthy()
  })
})