import { DomainError } from '@shared/core/errors/domain-error'
import { ErrorCodes } from '@shared/utils/error-codes.utils'

export class InvalidEmailError extends DomainError {
  constructor(value: string) {
    super({
      code: ErrorCodes.INVALID_EMAIL,
      field: 'email',
      value
    })
  }
}
