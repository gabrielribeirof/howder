import { TokenPayload } from './token-payload'
import { User } from '@modules/users/domain/user/user'
import { Agent } from '@modules/agents/domain/agent/agent'

export interface ITokenProvider {
  decodeToken(token: string): Promise<TokenPayload>
  signUserToken(user: User): string
  signAgentToken(agent: Agent): string
}
