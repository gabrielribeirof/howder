import { Chat } from '@modules/chats/domain/chat/chat'
import { createChat } from '@modules/chats/domain/chat/factories/chat.factory'

type ChatOverrides = {
  user_id?: string
  member_id?: string
  is_open?: boolean
  workspace_id?: string
}

export function makeChat(overrides?: ChatOverrides): Chat {
  const chat = createChat({
    user_id: overrides?.user_id ?? 'user-id',
    member_id: overrides?.member_id,
    is_open: overrides?.is_open,
    workspace_id: overrides?.workspace_id ?? 'workspace-id'
  })

  if (chat.isLeft()) throw new Error()

  return chat.value
}
