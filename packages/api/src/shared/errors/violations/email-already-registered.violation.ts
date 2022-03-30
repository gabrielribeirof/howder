import { Violation } from '@shared/core/errors/violation'
import { ViolationReasons } from '@shared/core/errors/violation-reasons'

export class EmailAlreadyRegisteredViolation extends Violation {
  constructor(value: string) {
    super({
      reason: ViolationReasons.EMAIL_ALREADY_REGISTERED,
      field: 'email',
      value
    })
  }
}
