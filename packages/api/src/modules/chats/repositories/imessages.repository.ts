import { Message } from '../domain/message/message'

export interface IMessagesRespository {
  save(message: Message): Promise<void>
}
