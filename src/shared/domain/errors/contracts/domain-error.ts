interface IDomainErrorProps {
  code: string
  field: string
  value: string
  min?: number
  max?: number
}

export abstract class DomainError {
  code: string
  field: string
  value: string
  min?: number
  max?: number

  constructor({ code, field, value, min, max }: IDomainErrorProps) {
    this.code = code
    this.field = field
    this.value = value
    this.min = min
    this.max = max
  }
}
