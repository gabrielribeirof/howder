import { ViolationReasons } from './violation-reasons'

type ViolationProps = {
  reason: ViolationReasons
  field: string
  value: string
  expectedValues?: string[] | number[]
  min?: number
  max?: number
}

export abstract class Violation {
  public reason: ViolationReasons
  public field: string
  public value: string
  public expectedValues?: string[] | number[]
  public min?: number
  public max?: number

  constructor({ reason, field, value, expectedValues, min, max }: ViolationProps) {
    this.reason = reason
    this.field = field
    this.value = value
    this.expectedValues = expectedValues
    this.min = min
    this.max = max
  }
}
