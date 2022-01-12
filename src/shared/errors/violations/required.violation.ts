import { Violation } from '@shared/core/errors/violation'
import { ViolationReasons } from '@shared/core/errors/violation-reasons'

export class RequiredViolation extends Violation {
  constructor(field: string, value: string) {
    super({
      reason: ViolationReasons.REQUIRED,
      field,
      value
    })
  }
}
