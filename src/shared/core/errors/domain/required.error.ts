import { DomainError } from '@shared/core/errors/domain-error'
import { REQUIRED } from '@shared/core/errors/codes.json'

export class RequiredError extends DomainError {
  constructor(field: string, value: string) {
    super({
      code: REQUIRED,
      field,
      value
    })
  }
}
