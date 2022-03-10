import { AppError } from '@shared/core/errors/app-error'
import { AppErrorCodes } from '@shared/core/errors/app-error-codes'
import { HTTPStatus } from '@shared/infra/http/status'

export class UnknownChatTagError extends AppError {
  constructor() {
    super({
      code: AppErrorCodes.UNKNOWN_CHAT_TAG,
      httpStatus: HTTPStatus.NOT_FOUND,
      message: 'Unknown chat tag'
    })
  }
}
