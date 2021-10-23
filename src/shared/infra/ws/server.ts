import { Server as SocketIOServer } from 'socket.io'
import http from 'http'

import { Logger } from '@shared/core/logger'

export class WsServer {
  private logger = new Logger(WsServer.name)
  private server: SocketIOServer
  private isRunning: boolean

  public create(httpServer: http.Server): SocketIOServer {
    this.server = new SocketIOServer(httpServer)
    this.isRunning = true

    this.logger.info('Server created')

    return this.server
  }

  public instance(): SocketIOServer | undefined {
    if (this.isRunning) {
      return this.server
    }

    return undefined
  }

  public close(): void {
    this.isRunning = false
    this.server.close()
  }
}
