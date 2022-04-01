import { TokenPayload } from '@shared/providers/token/token-payload'

declare global {
  namespace Express {
    interface Request {
      token_payload: TokenPayload
    }
  }
}
