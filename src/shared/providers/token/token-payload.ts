export type TokenPayload = {
  iat: number
  exp: number
  sub: string
  bearer: 'user' | 'agent'
}
