import { ServiceError } from '@shared/core/errors/service-error'
import { ErrorCodes } from '@shared/utils/error-codes.utils'

export class EmailAlreadyRegisteredError extends ServiceError {
  constructor(value: string) {
    super({
      code: ErrorCodes.EMAIL_ALREADY_REGISTERED,
      field: 'email',
      value
    })
  }
}
