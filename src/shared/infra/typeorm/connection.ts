import { Logger } from '@shared/core/logger'
import { Connection, createConnection } from 'typeorm'

export class TypeORMConnection {
  private logger = new Logger(TypeORMConnection.name)
  private connection: Connection

  public async create(): Promise<void> {
    const timer = setTimeout(() => {
      this.logger.emerg('Could not connect to database')
    }, 15000)

    this.connection = await createConnection()

    clearTimeout(timer)

    this.logger.info('Connection created')
  }

  public async instance(): Promise<Connection> {
    if (this.connection) {
      return this.connection
    } else {
      await this.create()

      return this.connection
    }
  }

  public close(): void {
    this.connection.isConnected && this.connection.close()
  }
}
