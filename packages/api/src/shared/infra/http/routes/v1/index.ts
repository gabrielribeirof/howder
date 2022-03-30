import { Router } from 'express'

// import userRoutes from '@modules/users/infra/http/routes/user.routes'

const v1Router = Router()

v1Router.use('/users', (req, res) => res.send('go little rock star'))

export { v1Router }
