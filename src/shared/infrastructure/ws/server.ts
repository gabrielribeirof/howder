import { Server } from 'socket.io'
import HttpServer from '../http/server'

class WsServer {
  instance: Server

  public create(): void {
    this.instance = new Server(HttpServer.instance)
  }
}

export default new WsServer()
