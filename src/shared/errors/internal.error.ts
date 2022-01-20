import { AppError } from '../core/errors/app-error'
import { AppErrorCodes } from '../core/errors/app-error-codes'

export class InternalError extends AppError {
  constructor() {
    super({
      httpStatusCode: 500,
      code: AppErrorCodes.INTERNAL,
      message: 'Internal Server Error'
    })
  }
}
