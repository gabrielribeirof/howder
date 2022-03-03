import { AppError } from '@shared/core/errors/app-error'
import { AppErrorCodes } from '@shared/core/errors/app-error-codes'
import { HTTPStatus } from '@shared/infra/http/status'

export class UnauthorizedError extends AppError {
  constructor() {
    super({
      code: AppErrorCodes.UNAUTHORIZED,
      httpStatus: HTTPStatus.FORBIDDEN,
      message: 'You lack permissions to perform that action'
    })
  }
}
