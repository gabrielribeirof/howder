import 'reflect-metadata'
import dotenv from 'dotenv'

import { I18n } from './i18n'
import { TypeORMConnection } from './database/connection'
import { HttpServer } from './http/server'
import { WsServer } from './ws/server'

import { Logger } from '@shared/core/logger'

async function ignitor(): Promise<void> {
  const logger = new Logger('Ignitor')

  logger.info(`Application igniting in ${process.env.NODE_ENV}`)

  process.env.NODE_ENV === 'production' && dotenv.config()

  const i18N = new I18n()
  const typeORMConnection = new TypeORMConnection()
  const httpServer = new HttpServer()
  const wsServer = new WsServer()

  try {
    await i18N.init()
    await typeORMConnection.create()
    httpServer.create()
    wsServer.create(httpServer.instance())

    logger.info('Application ignited')
  } catch (error) {
    logger.emerg(error)
  }
}

ignitor()
