import { TokenPayload } from '@shared/providers/token/token-payload'

declare namespace Express {
  export interface Request {
    token_payload: TokenPayload
  }
}
