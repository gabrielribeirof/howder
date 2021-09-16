import { DomainError } from '@shared/core/errors/domain-error'
import { EMAIL_INVALID } from '@shared/core/errors/codes.json'

export class InvalidEmailError extends DomainError {
  constructor(value: string) {
    super({
      code: EMAIL_INVALID,
      field: 'email',
      value
    })
  }
}
