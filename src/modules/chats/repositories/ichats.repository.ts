import { Chat } from '../domain/chat/chat'

export interface IChatsRepository {
  findById(id: string): Promise<Chat | undefined>
  findOpenChatOfUserByUserId(user_id: string): Promise<Chat | undefined>
  findByWorkspaceId(workspaceId: string, count: number, page: number, is_open?: boolean): Promise<Chat[] | undefined>
  save(chat: Chat): Promise<void>
}
