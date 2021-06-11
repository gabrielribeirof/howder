import { DomainError } from '@shared/domain/errors/contracts/domain-error'
import { EmailCodes } from '@shared/domain/errors/codes/email.codes'

export class InvalidEmailError extends DomainError {
  constructor(value: string) {
    super({
      code: EmailCodes.invalid,
      field: 'email',
      value
    })
  }
}
