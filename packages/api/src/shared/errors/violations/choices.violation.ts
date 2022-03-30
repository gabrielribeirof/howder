import { Violation } from '@shared/core/errors/violation'
import { ViolationReasons } from '@shared/core/errors/violation-reasons'

export class ChoicesViolation extends Violation {
  constructor(field: string, value: string, expectedValues: string[] | number[]) {
    super({
      reason: ViolationReasons.CHOICES,
      field,
      value,
      expectedValues
    })
  }
}
