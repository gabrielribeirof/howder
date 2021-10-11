import { DomainError } from '@shared/core/errors/domain-error'
import { INVALID_EMAIL } from '@shared/core/errors/codes.json'

export class InvalidEmailError extends DomainError {
  constructor(value: string) {
    super({
      code: INVALID_EMAIL,
      field: 'email',
      value
    })
  }
}
