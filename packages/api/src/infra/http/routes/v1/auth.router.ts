import { Router } from 'express'

import { AuthController } from '@modules/agents/infra/http/controllers/auth.controller'

const authController = new AuthController()

const authRouter = Router()

authRouter.post('/signup', authController.signup)
authRouter.post('/signin', authController.signin)

export { authRouter }
