import 'reflect-metadata'
import dotenv from 'dotenv'

import http, { Server } from 'http'
import express, { Application, Request, Response, NextFunction } from 'express'
import 'express-async-errors'

import { v1Router } from './routes/v1'

export class HttpServer {
  static instance: Server
  static app: Application

  private constructor() {}

  public static create(port: number): void {
    HttpServer.app = express()

    if (process.env.enviroment !== 'production') {
      dotenv.config()
    }

    HttpServer.middlewares()
    HttpServer.routes()
    HttpServer.exceptionsHandler()

    HttpServer.instance = http.createServer(HttpServer.app)
    HttpServer.instance.listen(port)
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

      console.error(err)
    })
  }
}
