import http, { Server } from 'http'
import express, { Application, Request, Response, NextFunction } from 'express'
import { v1Router } from './routes/v1'

import { Logger } from '@shared/core/logger'

export class HttpServer {
  static instance: Server
  static app: Application

  public static create(port: number): void {
    HttpServer.app = express()

    HttpServer.middlewares()
    HttpServer.routes()
    HttpServer.exceptionsHandler()

    HttpServer.instance = http.createServer(HttpServer.app)
    HttpServer.instance.listen(port)

    Logger.info('Server created', { tag: this.name })
  }

  private static middlewares(): void {
    HttpServer.app.use(express.json())
  }

  private static routes(): void {
    HttpServer.app.use('/api/v1', v1Router)
  }

  private static exceptionsHandler(): void {
    HttpServer.app.use((err: any, request: Request, response: Response, _: NextFunction): any => {
      response.status(500).json({ error: 'Internal server error.' })

      Logger.alert(err)
    })
  }
}
