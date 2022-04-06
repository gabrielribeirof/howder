import { BearerTypeValue } from '@shared/core/domain/bearer-type'

export type TokenPayload = {
  issued_at: number
  expires_in: number
  subject: string
  bearer_type: BearerTypeValue
}
