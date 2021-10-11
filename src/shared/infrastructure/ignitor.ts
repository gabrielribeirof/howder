import 'reflect-metadata'
import dotenv from 'dotenv'

import { HttpServer } from './http/server'
import { WsServer } from './ws/server'
import { TypeORMConnection } from './typeorm/connection'
import { I18n } from './i18n'

import { Logger } from '@shared/core/logger'

async function ignitor(): Promise<void> {
  try {
    Logger.init()
    Logger.info(`Application igniting in ${process.env.NODE_ENV}...`, { tag: 'Ignitor' })

    if (process.env.NODE_ENV === 'production') {
      dotenv.config()
    }

    await I18n.init()
    await TypeORMConnection.create()
    HttpServer.create(3333)
    WsServer.create()

    Logger.info('Application ignited', { tag: 'Ignitor' })
  } catch (error) {
    Logger.emerg(error, { tag: 'Ignitor' })
  }
}

ignitor()
