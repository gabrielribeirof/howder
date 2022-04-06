import { AppError } from '@shared/core/errors/app-error'
import { AppErrorCodes } from '@shared/core/errors/app-error-codes'
import { HTTPStatus } from '@infra/http/status'

export class UnknownMemberError extends AppError {
  constructor() {
    super({
      code: AppErrorCodes.UNKNOWN_MEMBER,
      httpStatus: HTTPStatus.NOT_FOUND,
      message: 'Unknown member'
    })
  }
}
