import { DomainError } from '@shared/core/domain/domain-error'
import { MIN_LENGTH } from '@shared/core/errors/codes.json'

export class RequiredError extends DomainError {
  constructor(field: string, value: string) {
    super({
      code: MIN_LENGTH,
      field,
      value
    })
  }
}
