import { ServiceError } from '@shared/core/errors/service-error'
import { EMAIL_ALREADY_REGISTERED } from '@shared/core/errors/codes.json'

export class EmailAlreadyRegisteredError extends ServiceError {
  constructor(field: string, value: string) {
    super({
      code: EMAIL_ALREADY_REGISTERED,
      field,
      value
    })
  }
}
