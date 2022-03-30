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

  public static create(properties: PasswordProperties): Either<Violation, Password> {
    if (Guard.againstNullOrUndefined(properties.value).fail) {
      return left(new RequiredViolation('password', properties.value))
    }

    if (!properties.hashed) {
      if (Guard.inRange(properties.value.length, 6, 128).fail) {
        return left(new BadLengthViolation('password', properties.value, 6, 128))
      }
    }

    return right(new Password({
      value: properties.value,
      hashed: properties.hashed
    }))
  }
}
