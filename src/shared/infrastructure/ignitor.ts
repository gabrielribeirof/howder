import { HttpServer } from './http/server'
import { WsServer } from './ws/server'
import { TypeORMConnection } from './typeorm/connection'

import '@shared/core/i18n'

async function ignitor(): Promise<void> {
  await TypeORMConnection.create()
  HttpServer.create(3333)
  WsServer.create()
}

ignitor()
  .then(() => console.log('Application ignited'))
  .catch(error => console.log(error))
