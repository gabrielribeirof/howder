import { DomainError } from '@shared/core/domain/domain-error'
import { MAX_LENGTH } from '@shared/core/errors/codes.json'

export class MaxLengthError extends DomainError {
  constructor(field: string, value: string, max: number) {
    super({
      code: MAX_LENGTH,
      field,
      value,
      max
    })
  }
}
