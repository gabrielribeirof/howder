import i18next from 'i18next'
import { DomainError } from '@shared/core/errors/domain-error'

interface IFieldError {
  code: string
  message: string
}

export function parseErrors(domainErrors: DomainError[]): Record<any, any> {
  const parsed: Record<string, IFieldError> = {}

  for (const value of domainErrors) {
    parsed[value.field] = {
      code: value.code,
      message: i18next.t(`codes:${value.code}`, {
        min: String(value.min),
        max: String(value.max)
      })
    }
  }

  return parsed
}
