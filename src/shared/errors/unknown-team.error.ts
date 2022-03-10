import { AppError } from '@shared/core/errors/app-error'
import { AppErrorCodes } from '@shared/core/errors/app-error-codes'
import { HTTPStatus } from '@shared/infra/http/status'

export class UnknownTeamError extends AppError {
  constructor() {
    super({
      code: AppErrorCodes.UNKNOWN_TEAM,
      httpStatus: HTTPStatus.NOT_FOUND,
      message: 'Unknown team'
    })
  }
}
