import { AppError } from '@shared/core/errors/app-error'
import { AppErrorCodes } from '@shared/core/errors/app-error-codes'
import { HTTPStatus } from '@infra/http/status'

export class InternalError extends AppError {
  constructor() {
    super({
      code: AppErrorCodes.INTERNAL,
      httpStatus: HTTPStatus.INTERNAL_SERVER_ERROR,
      message: 'Internal Server Error'
    })
  }
}
