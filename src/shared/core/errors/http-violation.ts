import { ViolationReasons } from './violation-reasons'

export type HTTPViolation = {
  reason: ViolationReasons
  field: string
  message: string
}
