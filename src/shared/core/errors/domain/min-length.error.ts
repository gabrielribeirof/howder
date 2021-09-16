import { DomainError } from '@shared/core/errors/domain-error'
import { MIN_LENGTH } from '@shared/core/errors/codes.json'

export class MinLengthError extends DomainError {
  constructor(field: string, value: string) {
    super({
      code: MIN_LENGTH,
      field,
      value
    })
  }
}
