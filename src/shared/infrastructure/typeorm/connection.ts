import { Logger } from '@shared/core/logger'
import { Connection, getConnectionOptions, createConnection } from 'typeorm'

export class TypeORMConnection {
  static instance: Connection

  public static async create(): Promise<void> {
    Logger.setTag(this.name)

    try {
      const defaultOptions = await getConnectionOptions()

      TypeORMConnection.instance = await createConnection(defaultOptions)

      Logger.info('Connection created')
    } catch (error) {
      Logger.emerg(error)
    }
  }

  public static async close(): Promise<void> {
    await TypeORMConnection.instance.close()
  }
}
