import { AppError } from '@shared/core/errors/app-error'
import { AppErrorCodes } from '@shared/core/errors/app-error-codes'
import { HTTPStatus } from '@shared/infra/http/status'

export class ChatAlreadyHasMemberAssignedError extends AppError {
  constructor() {
    super({
      code: AppErrorCodes.CHAT_ALREADY_HAS_MEMBER_ASSIGNED,
      httpStatus: HTTPStatus.CONFLICT,
      message: 'Chat already has member assigned'
    })
  }
}
