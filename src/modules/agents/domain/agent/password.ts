import bcrypt from 'bcryptjs'
import { ValueObject } from '@shared/core/domain/value-object'

import { Violation } from '@shared/core/errors/violation'
import { Guard } from '@shared/core/logic/guard'
import { Either, right, left } from '@shared/core/logic/either'

import { RequiredViolation } from '@shared/errors/violations/required.violation'
import { BadLengthViolation } from '@shared/errors/violations/bad-length.violation'

interface PasswordProperties {
  value: string
  hashed: boolean
}

export class Password extends ValueObject<PasswordProperties> {
  public get value(): string {
    return this.properties.value
  }

  public get hashed(): boolean {
    return this.properties.hashed
  }

  private constructor(properties: PasswordProperties) {
    super(properties)
  }

  public async getHashedValue(): Promise<string> {
    if (this.hashed) {
      return this.value
    }

    return await bcrypt.hash(this.value, 8)
  }

  public async comparePassword(plainTextPassword: string): Promise<boolean> {
    const hashedPassword = this.value

    if (this.hashed) {
      return await bcrypt.compare(plainTextPassword, hashedPassword)
    }

    return hashedPassword === plainTextPassword
  }

  public static create(data: PasswordProperties): Either<Violation, Password> {
    if (Guard.againstNullOrUndefined(data.value).fail) {
      return left(new RequiredViolation('password', data.value))
    }

    if (!data.hashed) {
      if (Guard.inRange(data.value.length, 6, 128).fail) {
        return left(new BadLengthViolation('password', data.value, 6, 128))
      }
    }

    return right(new Password({
      value: data.value,
      hashed: data.hashed
    }))
  }
}
