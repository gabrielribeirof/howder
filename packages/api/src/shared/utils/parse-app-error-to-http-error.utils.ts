import i18next from 'i18next'
import { AppError } from '@shared/core/errors/app-error'
import { HTTPError } from '@infra/http/error'

export function parseAppErrorToHTTPError(appError: AppError): HTTPError {
  return {
    status: appError.httpStatus,
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
