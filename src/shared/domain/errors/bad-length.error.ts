import { DomainError } from '@shared/domain/errors/contracts/domain-error'
import { BaseCodes } from '@shared/domain/errors/codes/base.codes'

export class BadLengthError extends DomainError {
  constructor(field: string, value: string, min: number, max: number) {
    super({
      code: BaseCodes.badLength,
      field,
      value,
      min,
      max
    })
  }
}
