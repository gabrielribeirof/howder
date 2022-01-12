import { Violation } from '@shared/core/errors/violation'
import { ViolationReasons } from '@shared/core/errors/violation-reasons'

export class MinLengthViolation extends Violation {
  constructor(field: string, value: string, min: number) {
    super({
      reason: ViolationReasons.MIN_LENGTH,
      field,
      value,
      min
    })
  }
}
