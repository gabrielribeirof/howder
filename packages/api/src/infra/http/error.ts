import { Violation } from '@shared/core/errors/violation'

import { AppErrorCodes } from '@shared/core/errors/app-error-codes'
import { HTTPStatus } from './status'

export type HTTPError = {
  code: AppErrorCodes
  status: HTTPStatus
  message: string
  violations?: (Pick<Violation, 'reason' | 'field'> & {
    message: string
  })[]
}
