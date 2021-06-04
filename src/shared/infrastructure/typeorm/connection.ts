import { Connection, getConnectionOptions, createConnection } from 'typeorm'

class TypeORMConnection {
  instance: Connection

  public async create(): Promise<Connection> {
    try {
      const defaultOptions = await getConnectionOptions()

      const databaseName = process.env.NODE_ENV === 'production'
        ? defaultOptions.database
        : 'support-chat'

      Object.assign(defaultOptions, {
        database: databaseName
      })

      this.instance = await createConnection(defaultOptions)

      return this.instance
    } catch (error) {
      throw new Error(`[TYPEORM] > ${error}`)
    }
  }

  public async close(): Promise<void> {
    await this.instance.close()
  }
}

export default new TypeORMConnection()
