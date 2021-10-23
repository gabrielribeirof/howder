import { DomainError } from '@shared/core/errors/domain-error'
import { ErrorCodes } from '@shared/utils/error-codes.utils'

export class RequiredError extends DomainError {
  constructor(field: string, value: string) {
    super({
      code: ErrorCodes.REQUIRED,
      field,
      value
    })
  }
}
