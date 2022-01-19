import http from 'http'
import express, { Request, Response, NextFunction } from 'express'
import { Logger } from '@shared/core/logger'

import { ErrorsMapper } from '@shared/core/errors/errors-mapper'
import { NotFoundError } from '@shared/errors/not-found.error'
import { InternalError } from '@shared/errors/internal.error'

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
    return this.server ? this.server : this.create()
  }

  public close(): void {
    this.server && this.server.close()
  }

  private middlewares(): void {
    this.app.use(express.json())
  }

  private routes(): void {
    this.app.use('/api/v1', v1Router)
    this.app.use('*', (request, response) => {
      response.status(404).json(ErrorsMapper.toHTTP(new NotFoundError()))
    })
  }

  private exceptionsHandler(): void {
    this.app.use((err: any, request: Request, response: Response, _: NextFunction): void => {
      response.status(500).json(ErrorsMapper.toHTTP(new InternalError()))

      this.logger.alert(err)
    })
  }
}
