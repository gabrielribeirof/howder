import { AppError } from '@shared/core/errors/app-error'
import { AppErrorCodes } from '@shared/core/errors/app-error-codes'
import { HTTPStatus } from '@shared/infra/http/status'

export class NotFoundError extends AppError {
  constructor() {
    super({
      code: AppErrorCodes.NOT_FOUND,
      httpStatus: HTTPStatus.NOT_FOUND,
      message: 'Resource not found'
    })
  }
}
