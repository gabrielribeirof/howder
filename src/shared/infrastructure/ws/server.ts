import { Server } from 'socket.io'
import { HttpServer } from '../http/server'

import { Logger } from '@shared/core/logger'

export class WsServer {
  static instance: Server

  public static create(): void {
    WsServer.instance = new Server(HttpServer.instance)

    Logger.info('Server created', { tag: this.name })
  }
}
