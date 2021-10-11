import { ServiceError } from '@shared/core/errors/service-error'
import { USERNAME_ALREADY_REGISTERED } from '@shared/core/errors/codes.json'

export class UsernameAlreadyRegisteredError extends ServiceError {
  constructor(field: string, value: string) {
    super({
      code: USERNAME_ALREADY_REGISTERED,
      field,
      value
    })
  }
}
