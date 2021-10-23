import { ServiceError } from '@shared/core/errors/service-error'
import { ErrorCodes } from '@shared/utils/error-codes.utils'

export class UsernameAlreadyRegisteredError extends ServiceError {
  constructor(value: string) {
    super({
      code: ErrorCodes.USERNAME_ALREADY_REGISTERED,
      field: 'username',
      value
    })
  }
}
