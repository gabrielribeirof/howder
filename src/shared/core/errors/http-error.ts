import { AppErrorCodes } from './app-error-codes'
import { HTTPViolation } from './http-violation'

export type HTTPError = {
  code: AppErrorCodes
  status: number
  message: string
  violations?: HTTPViolation[]
}
