import { Violation } from '@shared/core/errors/violation'
import { ViolationReasons } from '@shared/core/errors/violation-reasons'

export class MaxLengthViolation extends Violation {
  constructor(field: string, value: string, max: number) {
    super({
      reason: ViolationReasons.MAX_LENGTH,
      field,
      value,
      max
    })
  }
}
