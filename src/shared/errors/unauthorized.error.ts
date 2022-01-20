import { AppError } from '../core/errors/app-error'
import { AppErrorCodes } from '../core/errors/app-error-codes'

export class UnauthorizedError extends AppError {
  constructor() {
    super({
      httpStatusCode: 403,
      code: AppErrorCodes.UNAUTHORIZED,
      message: 'You lack permissions to perform that action'
    })
  }
}
