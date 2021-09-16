import { Connection, getConnectionOptions, createConnection } from 'typeorm'

export class TypeORMConnection {
  static instance: Connection

  private constructor() {}

  public static async create(): Promise<Connection> {
    try {
      const defaultOptions = await getConnectionOptions()

      TypeORMConnection.instance = await createConnection(defaultOptions)

      return TypeORMConnection.instance
    } catch (error) {
      throw new Error(error)
    }
  }

  public static async close(): Promise<void> {
    await TypeORMConnection.instance.close()
  }
}
