import bcrypt from 'bcryptjs'
import { Password } from './password'

let genericPassword: Password
let hashedPassword: Password
let hashedValue: string

describe('Agent password value object', () => {
  beforeAll(async () => {
    const toGenericPassword = Password.create({ value: '123456', hashed: false })
    if (toGenericPassword.isLeft()) throw new Error()

    const toHashedValue = await toGenericPassword.value.getHashedValue()

    const toHashedPassword = Password.create({ value: toHashedValue, hashed: true })
    if (toHashedPassword.isLeft()) throw new Error()

    genericPassword = toGenericPassword.value
    hashedValue = toHashedValue
    hashedPassword = toHashedPassword.value
  })

  it('should accept valid password', () => {
    const password = Password.create({ value: '123456', hashed: false })

    expect(password.isRight()).toBeTruthy()
  })

  it('should reject password with less than 6 characters', () => {
    const password = Password.create({ value: '12345', hashed: false })

    expect(password.isLeft()).toBeTruthy()
  })

  it('should reject password with more than 128 characters', () => {
    const password = Password.create({
      value: '1'.repeat(130),
      hashed: false
    })

    expect(password.isLeft()).toBeTruthy()
  })

  it('should hash the password', async () => {
    expect(await bcrypt.compare('123456', hashedValue)).toBeTruthy()
  })

  it('should not hash the password when already hashed', async () => {
    expect(await hashedPassword.getHashedValue()).toEqual(hashedValue)
  })

  it('should compare the password when not hashed', () => {
    expect(genericPassword.comparePassword('123456')).toBeTruthy()
  })

  it('should compare the password when hashed', async () => {
    expect(hashedPassword.comparePassword('123456')).toBeTruthy()
  })
})
