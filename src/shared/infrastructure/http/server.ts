import 'reflect-metadata'
import dotenv from 'dotenv'

import http, { Server } from 'http'
import express, { Application, Request, Response, NextFunction } from 'express'
import 'express-async-errors'

import routes from './routes'

class HttpServer {
  instance: Server
  application: Application

  public create(): void {
    this.application = express()

    process.env.environment === 'production' && dotenv.config()

    this.middlewares()
    this.routes()
    this.exceptionsHandler()

    this.instance = http.createServer(this.application)
  }

  public listen(port: number): void {
    this.instance.listen(port)
  }

  public async close(): Promise<void> {
    return new Promise((resolve) => this.instance.close(() => resolve()))
  }

  private middlewares(): void {
    this.application.use(express.json())
  }

  private routes(): void {
    this.application.use('/api', routes)
  }

  private exceptionsHandler(): void {
    this.application.use((err: any, request: Request, response: Response, _: NextFunction): any => {
      response.status(500).send('Error')

      console.log(err)
    })
  }
}

export default new HttpServer()
