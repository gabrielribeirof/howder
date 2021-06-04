import HttpServer from './http/server'
import WsServer from './ws/server'
import TypeORMConnection from './typeorm/connection'

async function ignitor(): Promise<void> {
  await TypeORMConnection.create()

  HttpServer.create()
  WsServer.create()

  HttpServer.listen(3333)
}

ignitor()
  .then(() => console.log('Application ignited'))
  .catch(error => console.log(error))
