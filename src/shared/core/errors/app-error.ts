import { AppErrorCodes } from './app-error-codes'
import { Violation } from './violation'

type AppErrorProps = {
  httpCode: number
  code: AppErrorCodes
  message: string
  violations?: Violation[]
}

export abstract class AppError {
  httpCode: number
  code: AppErrorCodes
  message: string
  violations?: Violation[]

  constructor({ httpCode, code, message, violations }: AppErrorProps) {
    this.httpCode = httpCode
    this.code = code
    this.message = message
    this.violations = violations
  }
}
