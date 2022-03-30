import { Violation } from '@shared/core/errors/violation'
import { ViolationReasons } from '@shared/core/errors/violation-reasons'

export class BadLengthViolation extends Violation {
  constructor(field: string, value: string, min: number, max: number) {
    super({
      reason: ViolationReasons.BAD_LENGTH,
      field,
      value,
      min,
      max
    })
  }
}
