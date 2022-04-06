import { AppError } from '@shared/core/errors/app-error'
import { AppErrorCodes } from '@shared/core/errors/app-error-codes'
import { HTTPStatus } from '@infra/http/status'

export class ChatAlreadyOpenError extends AppError {
  constructor() {
    super({
      code: AppErrorCodes.CHAT_ALREADY_OPEN,
      httpStatus: HTTPStatus.CONFLICT,
      message: 'Chat already open'
    })
  }
}
