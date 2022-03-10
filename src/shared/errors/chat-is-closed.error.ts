import { AppError } from '@shared/core/errors/app-error'
import { AppErrorCodes } from '@shared/core/errors/app-error-codes'
import { HTTPStatus } from '@shared/infra/http/status'

export class ChatIsClosedError extends AppError {
  constructor() {
    super({
      code: AppErrorCodes.CHAT_IS_CLOSED,
      httpStatus: HTTPStatus.CONFLICT,
      message: 'Chat is closed'
    })
  }
}
