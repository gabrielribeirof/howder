import { Router } from 'express'

import { authRouter } from './auth.router'
import { workspaceRouter } from './workspace.router'
import { teamRouter } from './team.router'
import { memberRouter } from './member.router'
import { tagRouter } from './tag.router'
import { chatRouter } from './chat.router'

const v1Router = Router()

v1Router.use('/auth', authRouter)
v1Router.use('/workspaces', workspaceRouter)
v1Router.use('/teams', teamRouter)
v1Router.use('/members', memberRouter)
v1Router.use('/tags', tagRouter)
v1Router.use('/chats', chatRouter)

export { v1Router }
