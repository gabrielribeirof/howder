import { Logger } from '@shared/core/logger'
import { Connection, getConnectionOptions, createConnection } from 'typeorm'

export class TypeORMConnection {
  private logger = new Logger(TypeORMConnection.name)
  private connection: Connection

  public async create(): Promise<void> {
    try {
      const defaultOptions = await getConnectionOptions()

      const timer = setTimeout(() => {
        this.logger.emerg('Could not connect to database')
      }, 15000)

      this.connection = await createConnection(defaultOptions)

      clearTimeout(timer)

      this.logger.info('Connection created')
    } catch (error) {
      this.logger.emerg(error)
    }
  }

  public async instance(): Promise<Connection> {
    if (this.connection.isConnected) {
      return this.connection
    } else {
      return await this.connection.connect()
    }
  }

  public async close(): Promise<void> {
    if (!this.connection.isConnected) return

    try {
      await (await this.instance()).close()
    } catch (error) {
      this.logger.emerg(error)
    }
  }
}
