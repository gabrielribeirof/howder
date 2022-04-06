import { AppError } from '@shared/core/errors/app-error'
import { AppErrorCodes } from '@shared/core/errors/app-error-codes'
import { Violation } from '@shared/core/errors/violation'
import { HTTPStatus } from '@infra/http/status'

export class InvalidParameterError extends AppError {
  constructor(violations?: Violation[]) {
    super({
      code: AppErrorCodes.INVALID_PARAMETER,
      httpStatus: HTTPStatus.BAD_REQUEST,
      message: 'Invalid parameter passed',
      violations
    })
  }
}
