import { Violation } from '@shared/core/errors/violation'
import { ViolationReasons } from '@shared/core/errors/violation-reasons'

export class NameAlreadyRegisteredViolation extends Violation {
  constructor(value: string) {
    super({
      reason: ViolationReasons.NAME_ALREADY_REGISTERED,
      field: 'name',
      value
    })
  }
}
