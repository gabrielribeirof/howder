import 'reflect-metadata'
import '@shared/container'

import { Logger } from '@shared/core/logger'
import { I18n } from '@shared/infra/i18n'
import { TypeORMConnection } from '@shared/infra/typeorm/connection'
import { HttpServer } from '@shared/infra/http/server'
import { WsServer } from '@shared/infra/ws/server'

import { beforeShutdown } from '@shared/utils/before-shutdown.utils'
import { environmentVariablesLoader } from '@shared/utils/environment-variables-loader.utils'

const logger = new Logger('Ignitor')
const i18n = new I18n()
const typeORMConnection = new TypeORMConnection()
const httpServer = new HttpServer()
const wsServer = new WsServer()

async function ignitor(): Promise<void> {
  environmentVariablesLoader()

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
