import { Logger } from '@shared/core/logger'
import { Connection, getConnectionOptions, createConnection } from 'typeorm'

export class TypeORMConnection {
  static instance: Connection

  public static async create(): Promise<void> {
    Logger.setTag(this.name)

    try {
      const defaultOptions = await getConnectionOptions()

      const timer = setTimeout(() => {
        Logger.emerg('Could not connect to database')
      }, 15000)

      TypeORMConnection.instance = await createConnection(defaultOptions)

      clearTimeout(timer)

      Logger.info('Connection created')
    } catch (error) {
      Logger.emerg(error)
    }
  }

  public static async close(): Promise<void> {
    await TypeORMConnection.instance.close()
  }
}
