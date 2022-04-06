import dotenv from 'dotenv'

import { Guard } from '@shared/core/logic/guard'

export function environmentVariablesLoader(): void {
  if (Guard.isOneOf(String(process.env.NODE_ENV), ['development', 'production']).fail) {
    process.env.NODE_ENV = 'development'
    dotenv.config({ path: '.env.dev' })
    return
  }

  if (process.env.NODE_ENV === 'development') {
    dotenv.config({ path: '.env.dev' })
  }

  if (process.env.NODE_ENV === 'production') {
    dotenv.config({ path: '.env.production' })
  }
}
