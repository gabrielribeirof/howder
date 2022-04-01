import { Response } from 'express'
import { AppError } from '@shared/core/errors/app-error'
import { Either } from '@shared/core/logic/either'
import { InternalError } from '@shared/errors/internal.error'

import { parseAppErrorToHTTPError } from '@shared/utils/parse-app-error-to-http-error.utils'

export abstract class Controller {
  protected ok(response: Response, payload?: any): void {
    response.status(200).json(payload)
  }

  protected fail(response: Response, payload: AppError): void {
    response.status(Number(payload.httpStatus)).json(parseAppErrorToHTTPError(payload))
  }

  protected respond(response: Response, either: Either<AppError, any>): void {
    if (either.isLeft()) {
      return this.fail(response, either.value)
    }

    if (either.isRight()) {
      return this.fail(response, either.value)
    }

    return this.fail(response, new InternalError())
  }
}
