import { AppError } from '@shared/core/errors/app-error'
import { AppErrorCodes } from '@shared/core/errors/app-error-codes'
import { HTTPStatus } from '@shared/infra/http/status'

export class ChatAlreadyClosedError extends AppError {
  constructor() {
    super({
      code: AppErrorCodes.CHAT_ALREADY_CLOSED,
      httpStatus: HTTPStatus.CONFLICT,
      message: 'Chat already closed'
    })
  }
}
