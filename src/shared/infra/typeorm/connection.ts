import { createConnection } from 'typeorm'

if (process.env.NODE_ENV === 'development') {
  createConnection()
}
