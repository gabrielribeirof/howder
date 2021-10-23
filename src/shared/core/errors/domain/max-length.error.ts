import { DomainError } from '@shared/core/errors/domain-error'
import { ErrorCodes } from '@shared/utils/error-codes.utils'

export class MaxLengthError extends DomainError {
  constructor(field: string, value: string, max: number) {
    super({
      code: ErrorCodes.MAX_LENGTH,
      field,
      value,
      max
    })
  }
}
