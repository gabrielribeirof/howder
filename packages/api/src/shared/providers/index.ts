import { container } from 'tsyringe'

import { ITokenProvider } from './token/itoken-provider'
import { TokenProvider } from './token/implementations/token-provider'

container.registerSingleton<ITokenProvider>('TokenProvider', TokenProvider)
