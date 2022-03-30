import { Violation } from './violation'
import { AppErrorCodes } from './app-error-codes'
import { HTTPStatus } from '@shared/infra/http/status'

type AppErrorProperties = {
  code: AppErrorCodes
  httpStatus: HTTPStatus
  message: string
  violations?: Violation[]
}

export abstract class AppError {
  public code: AppErrorCodes
  public httpStatus: HTTPStatus
  public message: string
  public violations?: Violation[]

  constructor({ code, httpStatus, message, violations }: AppErrorProperties) {
    this.code = code
    this.httpStatus = httpStatus
    this.message = message
    this.violations = violations
  }
}
