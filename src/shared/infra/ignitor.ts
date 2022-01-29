import 'reflect-metadata'
import dotenv from 'dotenv'

import { I18n } from './i18n'
import { TypeORMConnection } from './typeorm/connection'
import { HttpServer } from './http/server'
import { WsServer } from './ws/server'

import { Logger } from '@shared/core/logger'
import { onSigterm } from '@shared/utils/on-sigterm.utils'

const logger = new Logger('Ignitor')

async function ignitor(): Promise<void> {
  process.env.NODE_ENV === 'production'
    ? dotenv.config({ path: '.env.production' })
    : dotenv.config()

  const i18N = new I18n()
  const typeORMConnection = new TypeORMConnection()
  const httpServer = new HttpServer()
  const wsServer = new WsServer()

  await i18N.init()
  await typeORMConnection.create()
  httpServer.create()
  wsServer.create(httpServer.instance())

  onSigterm(
    typeORMConnection.close,
    httpServer.close,
    wsServer.close
  )
}

ignitor()
  .then(() => logger.info('Application ignited'))
  .catch(error => logger.emerg(error))
