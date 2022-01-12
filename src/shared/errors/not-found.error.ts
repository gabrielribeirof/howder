import { AppError } from '../core/errors/app-error'
import { AppErrorCodes } from '../core/errors/app-error-codes'

export class NotFoundError extends AppError {
  constructor() {
    super({
      httpCode: 404,
      code: AppErrorCodes.NOT_FOUND,
      message: 'Resource not found'
    })
  }
}
