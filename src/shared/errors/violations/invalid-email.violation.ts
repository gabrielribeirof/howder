import { Violation } from '@shared/core/errors/violation'
import { ViolationReasons } from '@shared/core/errors/violation-reasons'

export class InvalidEmailViolation extends Violation {
  constructor(value: string) {
    super({
      reason: ViolationReasons.INVALID_EMAIL,
      field: 'email',
      value
    })
  }
}
