import { Response } from 'express'
import { Either } from '@shared/core/logic/either'
import { AppError } from '@shared/core/errors/app-error'

import { InternalError } from '@shared/errors/internal.error'
import { parseAppErrorToHTTPError } from './parse-app-error-to-http-error.utils'

export function ok(expressResponse: Response, payload?: Record<string, any>): Response {
  return expressResponse.status(200).json(payload)
}

ok.either = (expressResponse: Response, either: Either<AppError, any>): void => {
  if (either.isLeft()) {
    fail(expressResponse, either.value)
    return
  }

  if (either.isRight()) {
    ok(expressResponse, either.value)
    return
  }

  fail(expressResponse, new InternalError())
}

export function fail(expressResponse: Response, payload: AppError): Response {
  return expressResponse.status(Number(payload.httpStatus)).json(parseAppErrorToHTTPError(payload))
}
