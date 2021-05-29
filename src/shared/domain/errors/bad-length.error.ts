import { DomainError } from '@shared/domain/errors/contracts/domain-error'
import { BaseCodes } from '@shared/domain/errors/codes/base.codes'

export class BadLengthError extends DomainError {
  min: number
  max: number

  constructor(field: string, value: string | number, min: number, max: number) {
    super(BaseCodes.badLength, field, value)

    this.min = min
    this.max = max
  }
}
