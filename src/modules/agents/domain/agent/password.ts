import bcrypt from 'bcryptjs'

import { Violation } from '@shared/core/errors/violation'
import { Guard } from '@shared/core/logic/guard'
import { Either, right, left } from '@shared/core/logic/either'

import { RequiredViolation } from '@shared/errors/violations/required.violation'
import { BadLengthViolation } from '@shared/errors/violations/bad-length.violation'

interface PasswordProperties {
  value: string
  hashed?: boolean
}

export class Password {
  public readonly value: string
  public readonly hashed?: boolean

  private constructor(props: PasswordProperties) {
    this.value = props.value
    this.hashed = props.hashed
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

  public static create({ value, hashed = false }: PasswordProperties): Either<Violation, Password> {
    if (!Guard.againstNullOrUndefined(value).succeeded) {
      return left(new RequiredViolation('password', value))
    }

    if (!hashed) {
      const lengthGuard = Guard.inRange(value.length, 6, 128)
      if (!lengthGuard.succeeded) {
        return left(new BadLengthViolation('password', value, 6, 128))
      }
    }

    return right(new Password({ value, hashed }))
  }
}
