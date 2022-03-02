import http from 'http'
import express, {
  Application as ExpressApplication,
  Request,
  Response,
  NextFunction
} from 'express'
import { Logger } from '@shared/core/logger'

import { fail } from '@shared/utils/http-response.utils'
import { NotFoundError } from '@shared/errors/not-found.error'
import { InternalError } from '@shared/errors/internal.error'

import { v1Router } from './routes/v1'

export class HttpServer {
  private logger = new Logger(HttpServer.name)
  private server: http.Server
  private app: ExpressApplication

  public create(): http.Server {
    this.app = express()

    this.middlewares()
    this.routes()
    this.exceptionsHandler()

    this.server = http.createServer(this.app)

    this.logger.info('Server created')

    return this.server
  }

  public start(): Promise<void> {
    this.server.listen(3333)

    return new Promise((resolve, reject) => {
      this.server.on('listening', resolve)
      this.server.on('error', reject)
    })
  }

  public get instance(): http.Server | undefined {
    return this.server
  }

  public close(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.instance) {
        return reject(new Error('Undefined HTTP Server instance'))
      }

      this.instance.close((value) => {
        if (typeof value === 'undefined') {
          this.logger.info('Server closed')

          return resolve()
        }

        reject(value)
      })
    })
  }

  private middlewares(): void {
    this.app.use(express.json())
  }

  private routes(): void {
    this.app.use('/api/v1', v1Router)
    this.app.use('*', (_, response) => fail(response, new NotFoundError()))
  }

  private exceptionsHandler(): void {
    this.app.use((error: any, _request: Request, response: Response, _next: NextFunction) => {
      this.logger.alert(error)

      return fail(response, new InternalError())
    })
  }
}
