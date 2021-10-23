import http from 'http'
import express, { Request, Response, NextFunction } from 'express'
import { Logger } from '@shared/core/logger'

import { v1Router } from './routes/v1'

export class HttpServer {
  private logger = new Logger(HttpServer.name)
  private server: http.Server
  private app: express.Application

  public create(): http.Server {
    this.app = express()

    this.middlewares()
    this.routes()
    this.exceptionsHandler()

    this.server = http.createServer(this.app)
    this.server.listen(3333)

    this.logger.info('Server created')

    return this.server
  }

  public instance(): http.Server {
    if (this.server.listening) {
      return this.server
    } else {
      return this.create()
    }
  }

  public close(): void {
    this.server.close()
  }

  private middlewares(): void {
    this.app.use(express.json())
  }

  private routes(): void {
    this.app.use('/api/v1', v1Router)
  }

  private exceptionsHandler(): void {
    this.app.use((err: any, request: Request, response: Response, _: NextFunction): any => {
      response.status(500).json({ error: 'Internal server error.' })

      this.logger.alert(err)
    })
  }
}
