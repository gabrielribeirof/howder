import { DomainError } from '@shared/domain/errors/contracts/domain-error'
import { BaseCodes } from '@shared/domain/errors/codes/base.codes'

export class RequiredError extends DomainError {
  constructor(field: string, value: string | number) {
    super(BaseCodes.required, field, value)
  }
}
