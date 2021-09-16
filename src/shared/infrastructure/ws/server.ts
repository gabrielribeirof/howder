import { Server } from 'socket.io'
import { HttpServer } from '../http/server'

export class WsServer {
  static instance: Server

  private constructor() {}

  public static create(): void {
    WsServer.instance = new Server(HttpServer.instance)
  }
}
