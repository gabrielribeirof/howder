import dotenv from 'dotenv'
import appRootPath from 'app-root-path'

import { Guard } from '@shared/core/logic/guard'

export function environmentVariablesLoader(): void {
  if (Guard.isOneOf(String(process.env.NODE_ENV), ['development', 'production']).fail) {
    throw new Error('NODE_ENV environment variable must be \'development\' or \'production\'')
  }

  if (process.env.NODE_ENV === 'development') {
    dotenv.config({ path: `${appRootPath.path}/.env.dev` })
  }

  if (process.env.NODE_ENV === 'production') {
    dotenv.config({ path: `${appRootPath.path}/.env.prod` })
  }
}
