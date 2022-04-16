import { Violation } from '@shared/core/errors/violation'
import { ViolationReasons } from '@shared/core/errors/violation-reasons'

export class WrongIDViolation extends Violation {
  constructor(field: string, value: string) {
    super({
      reason: ViolationReasons.WRONG_ID,
      field,
      value
    })
  }
}
