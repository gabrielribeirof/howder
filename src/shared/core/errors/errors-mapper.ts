import i18next from 'i18next'
import { AppError } from './app-error'
import { AppErrorCodes } from './app-error-codes'

import { ViolationReasons } from './violation-reasons'

type HTTPViolationModel = {
  reason: ViolationReasons
  field: string
  message: string
}

type HTTPErrorModel = {
  status: number
  code: AppErrorCodes
  message: string
  violations?: HTTPViolationModel[]
}

export class ErrorsMapper {
  public static toHTTP(appError: AppError): HTTPErrorModel {
    return {
      status: appError.httpCode,
      code: appError.code,
      message: appError.message,
      violations: appError.violations?.map(value => {
        return {
          reason: value.reason,
          field: value.field,
          message: i18next.t(`violation_messages:${value.reason}`, {
            max: value.max,
            min: value.min,
            expectedValues: value.expectedValues
          })
        }
      })
    }
  }
}
