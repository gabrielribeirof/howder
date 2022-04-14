import 'reflect-metadata'
import '@shared/container'

import { Logger } from '@shared/logger'
import { I18n } from '@infra/i18n'
import { TypeORMConnection } from '@infra/typeorm/connection'
import { HttpServer } from '@infra/http/server'
import { WsServer } from '@infra/ws/server'

import { beforeShutdown } from '@shared/utils/before-shutdown.utils'

const logger = new Logger('Ignitor')
const i18n = new I18n()
const typeORMConnection = new TypeORMConnection()
const httpServer = new HttpServer()
const wsServer = new WsServer()

async function ignitor(): Promise<void> {
  logger.notice(`Running on ${process.env.NODE_ENV} environment`)

  await i18n.init()
  await typeORMConnection.create()
  httpServer.create()
  wsServer.create(httpServer.instance)

  await httpServer.start()
}

ignitor()
  .then(() => logger.info('Application ignited'))
  .then(() => {
    beforeShutdown(async () => {
      wsServer.close()
      await httpServer.close()
      await typeORMConnection.close()
    })
  })
  .catch(error => logger.emerg(error))
