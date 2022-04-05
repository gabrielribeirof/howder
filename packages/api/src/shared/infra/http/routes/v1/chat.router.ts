import { Router } from 'express'

import { ChatController } from '@modules/chats/infra/http/controllers/chat.controller'
import { MessageController } from '@modules/chats/infra/http/controllers/message.controller'
import { ChatTagController } from '@modules/chats/infra/http/controllers/chat-tag.controller'

const chatController = new ChatController()
const messageController = new MessageController()
const chatTagController = new ChatTagController()

const chatRouter = Router()

chatRouter.get('/', chatController.index)
chatRouter.post('/:chat_id/open', chatController.open)
chatRouter.post('/:chat_id/open', chatController.close)
chatRouter.post('/:chat_id/assign', chatController.assign)
chatRouter.post('/:chat_id/unassign', chatController.unassign)

chatRouter.post('/:chat_id/messages', messageController.store)

chatRouter.post('/:chat_id/tags/:tag_id', chatTagController.store)
chatRouter.delete('/:chat_id/tags/:tag_id', chatTagController.destroy)

export { chatRouter }
