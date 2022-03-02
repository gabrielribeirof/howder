import { Connection, createConnection } from 'typeorm'
import { Logger } from '@shared/core/logger'

export class TypeORMConnection {
  private logger = new Logger(TypeORMConnection.name)
  private connection: Connection

  public async create(): Promise<Connection> {
    this.connection = await createConnection()

    this.logger.info('Connection created')

    return this.connection
  }

  public get instance(): Connection | undefined {
    return this.connection
  }

  public close(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.instance || !this.instance.isConnected) {
        return reject(new Error('Undefined or not connected instance'))
      }

      this.instance.close().then(() => {
        this.logger.info('Connection closed')

        resolve()
      })
    })
  }
}
