export type HTTPError = {
  code: AppErrorCodes
  status: HTTPStatus
  message: string
  violations?: (Pick<Violation, 'reason' | 'field'> & {
    message: string
  })[]
}
