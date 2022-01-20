import { Response } from 'express'
import { AppError } from '@shared/core/errors/app-error'

import { parseAppErrorToHTTPError } from './parse-app-error-to-http-error.utils'

export function ok(expressResponse: Response, payload?: string): Response {
  return expressResponse.status(200).json(payload)
}

export function fail(expressResponse: Response, payload: AppError): Response {
  return expressResponse.status(payload.httpStatusCode).json(parseAppErrorToHTTPError(payload))
}
