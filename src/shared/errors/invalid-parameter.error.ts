import { AppError } from '../core/errors/app-error'
import { AppErrorCodes } from '../core/errors/app-error-codes'
import { Violation } from '../core/errors/violation'

export class InvalidParameterError extends AppError {
  constructor(violations?: Violation[]) {
    super({
      httpStatusCode: 400,
      code: AppErrorCodes.INVALID_PARAMETER,
      message: 'Invalid parameter passed',
      violations
    })
  }
}
