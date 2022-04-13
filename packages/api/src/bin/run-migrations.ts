import { TypeORMConnection } from '@infra/typeorm/connection'
import { environmentVariablesLoader } from '@shared/utils/environment-variables-loader.utils'

let connection: TypeORMConnection

async function runMigration(): Promise<void> {
  environmentVariablesLoader()

  process.env.TYPEORM_LOGGING = "['query', 'error', 'schema']"

  connection = new TypeORMConnection()
  await connection.create()

  if (!connection.instance) throw new Error('Connection instance do not exists')

  await connection.instance.runMigrations()
  await connection.close()
}

runMigration()
  .then(() => process.exit(0))
  .catch(async (error) => {
    if (connection.instance?.isConnected) await connection.close()

    console.error(new Error(`Error during migration run: ${error}`))
    process.exit(1)
  })
