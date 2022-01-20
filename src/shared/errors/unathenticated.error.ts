import { AppError } from '../core/errors/app-error'
import { AppErrorCodes } from '../core/errors/app-error-codes'

export class UnauthenticatedError extends AppError {
  constructor() {
    super({
      httpStatusCode: 401,
      code: AppErrorCodes.UNAUTHENTICATED,
      message: 'Unauthenticated. Provide a valid token and try again'
    })
  }
}
