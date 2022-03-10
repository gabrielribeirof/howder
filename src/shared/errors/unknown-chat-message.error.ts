import { AppError } from '@shared/core/errors/app-error'
import { AppErrorCodes } from '@shared/core/errors/app-error-codes'
import { HTTPStatus } from '@shared/infra/http/status'

export class UnknownChatMessageError extends AppError {
  constructor() {
    super({
      code: AppErrorCodes.UNKNOWN_CHAT_MESSAGE,
      httpStatus: HTTPStatus.NOT_FOUND,
      message: 'Unknown chat message'
    })
  }
}
