import 'reflect-metadata'
import dotenv from 'dotenv'
import path from 'path'

export default (): void => {
  dotenv.config({ path: path.resolve(__dirname, '.env.dev') })
  process.env.TYPEORM_HOST = 'localhost'
  process.env.TYPEORM_LOGGING = ''
}
