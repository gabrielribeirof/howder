import { AppErrorCodes } from './app-error-codes'
import { Violation } from './violation'

type AppErrorProperties = {
  code: AppErrorCodes
  message: string
  violations?: Violation[]
  httpStatusCode: number
}

export abstract class AppError {
  public code: AppErrorCodes
  public message: string
  public violations?: Violation[]
  public httpStatusCode: number

  constructor({ code, message, violations, httpStatusCode }: AppErrorProperties) {
    this.code = code
    this.message = message
    this.violations = violations
    this.httpStatusCode = httpStatusCode
  }
}
