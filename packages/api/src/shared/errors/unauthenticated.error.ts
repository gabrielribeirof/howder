import { AppError } from '@shared/core/errors/app-error'
import { AppErrorCodes } from '@shared/core/errors/app-error-codes'
import { HTTPStatus } from '@infra/http/status'

export class UnauthenticatedError extends AppError {
  constructor() {
    super({
      code: AppErrorCodes.UNAUTHENTICATED,
      httpStatus: HTTPStatus.UNAUTHORIZED,
      message: 'Unauthenticated. Provide a valid token and try again'
    })
  }
}
