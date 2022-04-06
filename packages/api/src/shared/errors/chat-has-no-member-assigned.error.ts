import { AppError } from '@shared/core/errors/app-error'
import { AppErrorCodes } from '@shared/core/errors/app-error-codes'
import { HTTPStatus } from '@infra/http/status'

export class ChatHasNoMemberAssignedError extends AppError {
  constructor() {
    super({
      code: AppErrorCodes.CHAT_HAS_NO_MEMBER_ASSIGNED,
      httpStatus: HTTPStatus.CONFLICT,
      message: 'Chat has no member assigned'
    })
  }
}
