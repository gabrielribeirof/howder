interface IServiceErrorProps {
  code: string
  field: string
  value: string
}

export abstract class ServiceError {
  code: string
  field: string
  value: string

  constructor({ code, field, value }: IServiceErrorProps) {
    this.code = code
    this.field = field
    this.value = value
  }
}
