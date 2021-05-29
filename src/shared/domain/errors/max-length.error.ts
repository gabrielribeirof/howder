import { DomainError } from '@shared/domain/errors/contracts/domain-error'
import { BaseCodes } from '@shared/domain/errors/codes/base.codes'

export class MaxLengthError extends DomainError {
  max: number

  constructor(field: string, value: string | number, max: number) {
    super(BaseCodes.maxLength, field, value)

    this.max = max
  }
}
