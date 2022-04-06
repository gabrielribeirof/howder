import { AppError } from '@shared/core/errors/app-error'
import { AppErrorCodes } from '@shared/core/errors/app-error-codes'
import { Violation } from '@shared/core/errors/violation'
import { HTTPStatus } from '@infra/http/status'

export class AlreadyExistsError extends AppError {
  constructor(violations?: Violation[]) {
    super({
      code: AppErrorCodes.ALREADY_EXISTS,
      httpStatus: HTTPStatus.CONFLICT,
      message: 'Resource already exists',
      violations
    })
  }
}
