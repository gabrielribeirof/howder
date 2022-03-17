export type TokenPayload = {
  issued_at: number
  expires_in: number
  subject: string
  bearer: 'user' | 'agent'
}
