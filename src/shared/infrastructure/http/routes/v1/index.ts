import { Router } from 'express'

import userRoutes from '@modules/users/infrastructure/http/routes/user.routes'

const v1Router = Router()

v1Router.use('/users', userRoutes)

export { v1Router }
