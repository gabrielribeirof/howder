import { DomainError } from '@shared/core/errors/domain-error'
import { ErrorCodes } from '@shared/utils/error-codes.utils'

export class MinLengthError extends DomainError {
  constructor(field: string, value: string, min: number) {
    super({
      code: ErrorCodes.MIN_LENGTH,
      field,
      value,
      min
    })
  }
}
