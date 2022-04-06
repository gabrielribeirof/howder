import { Server as SocketIOServer } from 'socket.io'
import http from 'http'

import { Logger } from '@shared/logger'

export class WsServer {
  private logger = new Logger(WsServer.name)
  private server: SocketIOServer

  public create(httpServer?: http.Server): SocketIOServer {
    if (!httpServer) this.logger.emerg('Undefined HTTP Server instance')

    this.server = new SocketIOServer(httpServer, {
      cors: {
        origin: '*'
      }
    })

    this.logger.info('Server created')

    return this.server
  }

  public get instance(): SocketIOServer | undefined {
    return this.server
  }

  public close(): void {
    if (!this.instance) return

    this.instance.disconnectSockets()

    this.logger.info('Server closed')
  }
}
