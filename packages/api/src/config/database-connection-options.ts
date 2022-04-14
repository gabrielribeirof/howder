import { ConnectionOptions } from 'typeorm'

export const databaseConnectionOptions: ConnectionOptions = {
  type: 'postgres',
  host: String(process.env.TYPEORM_HOST),
  port: Number(process.env.TYPEORM_PORT),
  username: String(process.env.TYPEORM_USERNAME),
  password: String(process.env.TYPEORM_PASSWORD),
  database: String(process.env.TYPEORM_DATABASE),
  logging: Boolean(process.env.TYPEORM_LOGGING),
  entities: [String(process.env.TYPEORM_ENTITIES)],
  migrations: [String(process.env.TYPEORM_MIGRATIONS)]
}
