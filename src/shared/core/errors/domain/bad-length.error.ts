import { DomainError } from '@shared/core/errors/domain-error'
import { ErrorCodes } from '@shared/utils/error-codes.utils'

export class BadLengthError extends DomainError {
  constructor(field: string, value: string, min: number, max: number) {
    super({
      code: ErrorCodes.BAD_LENGTH,
      field,
      value,
      min,
      max
    })
  }
}
