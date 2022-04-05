import { Router } from 'express'

import { TagController } from '@modules/chats/infra/http/controllers/tag.controller'

const tagController = new TagController()

const tagRouter = Router()

tagRouter.post('/tags', tagController.store)
tagRouter.post('/tags/:tag_id', tagController.update)
tagRouter.delete('/tags/:tag_id', tagController.destroy)

export { tagRouter }
