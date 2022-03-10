import { AppError } from '@shared/core/errors/app-error'
import { AppErrorCodes } from '@shared/core/errors/app-error-codes'
import { HTTPStatus } from '@shared/infra/http/status'

export class MissingAccessError extends AppError {
  constructor() {
    super({
      code: AppErrorCodes.MISSING_ACCESS_ERROR,
      httpStatus: HTTPStatus.FORBIDDEN,
      message: 'Missing Access'
    })
  }
}
