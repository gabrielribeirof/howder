export abstract class DomainError {
  code: string
  field: string
  value: string | number

  constructor(code: string, field: string, value: string | number) {
    this.code = code
    this.field = field
    this.value = value
  }
}
