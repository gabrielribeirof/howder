import { AppError } from '../core/errors/app-error'
import { AppErrorCodes } from '../core/errors/app-error-codes'
import { Violation } from '../core/errors/violation'

export class AlreadyExistsError extends AppError {
  constructor(violations?: Violation[]) {
    super({
      httpCode: 409,
      code: AppErrorCodes.ALREADY_EXISTS,
      message: 'Resource already exists',
      violations
    })
  }
}
