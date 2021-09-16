import { DomainError } from '@shared/core/errors/domain-error'
import { BAD_LENGTH } from '@shared/core/errors/codes.json'

export class BadLengthError extends DomainError {
  constructor(field: string, value: string, min: number, max: number) {
    super({
      code: BAD_LENGTH,
      field,
      value,
      min,
      max
    })
  }
}
