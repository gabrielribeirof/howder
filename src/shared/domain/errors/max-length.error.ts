import { DomainError } from '@shared/domain/errors/contracts/domain-error'
import { BaseCodes } from '@shared/domain/errors/codes/base.codes'

export class MaxLengthError extends DomainError {
  constructor(field: string, value: string, max: number) {
    super({
      code: BaseCodes.maxLength,
      field,
      value,
      max
    })
  }
}
