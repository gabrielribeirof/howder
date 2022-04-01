import { Response } from 'express'
import { AppError } from '@shared/core/errors/app-error'
import { parseAppErrorToHTTPError } from './parse-app-error-to-http-error.utils'

export function fail(expressResponse: Response, payload: AppError): Response {
  return expressResponse.status(Number(payload.httpStatus)).json(parseAppErrorToHTTPError(payload))
}
