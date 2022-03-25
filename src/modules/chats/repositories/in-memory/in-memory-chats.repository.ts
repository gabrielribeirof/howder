import { Chat } from '@modules/chats/domain/chat/chat'
import { IChatsRepository } from '../ichats.repository'

export class InMemoryChatsRepository implements IChatsRepository {
  public chats: Chat[] = []

  public async findById(id: string): Promise<Chat | undefined> {
    return this.chats.find(arrayChat => arrayChat.id.value === id)
  }

  public async findOpenChatOfUserByUserId(user_id: string): Promise<Chat | undefined> {
    return this.chats.find(arrayChat => (arrayChat.user_id.value === user_id) && arrayChat.is_open)
  }

  public async findByWorkspaceId(
    workspaceId: string,
    count: number,
    page: number,
    is_open?: boolean
  ): Promise<Chat[] | undefined> {
    const targetChats = this.chats.slice(page === 1 ? 0 : (page - 1) * count, (count - 1))

    return targetChats.filter(arrayChat => {
      if (is_open) {
        return arrayChat.workspace_id.value === workspaceId && arrayChat.is_open === is_open
      }

      return arrayChat.workspace_id.value === workspaceId
    })
  }

  public async save(chat: Chat): Promise<void> {
    const index = this.chats.findIndex(arrayChat => arrayChat.id.equals(chat.id))

    if (index >= 0) {
      this.chats[index] = chat
      return
    }

    this.chats.push(chat)
  }
}
