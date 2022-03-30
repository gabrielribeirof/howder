import { sign, verify } from 'jsonwebtoken'
import { authentication } from '@config/authentication'

import { ITokenProvider } from '../itoken-provider'
import { TokenPayload } from '../token-payload'

import { User } from '@modules/users/domain/user/user'
import { Agent } from '@modules/agents/domain/agent/agent'
import { BearerType } from '@shared/core/domain/bearer-type'

export class TokenProvider implements ITokenProvider {
  public decodeToken(token: string): Promise<TokenPayload> {
    return new Promise((resolve, reject) => {
      verify(token, authentication.publicKey, (error, data) => {
        if (error) return reject(error)

        if (data && typeof data !== 'string') {
          return resolve({
            issued_at: Number(data.iat),
            expires_in: Number(data.exp),
            subject: String(data.sub),
            bearer_type: new BearerType(data.bearer)
          })
        }

        reject(data)
      })
    })
  }

  public signUserToken(user: User): string {
    return sign({ bearer: 'user' }, authentication.privateKey, {
      algorithm: 'RS256',
      subject: user.id.value,
      expiresIn: '2y'
    })
  }

  public signAgentToken(agent: Agent): string {
    return sign({ bearer: 'agent' }, authentication.privateKey, {
      algorithm: 'RS256',
      subject: agent.id.value,
      expiresIn: '1d'
    })
  }
}
