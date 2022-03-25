import { Message } from '@modules/chats/domain/message/message'
import { IMessagesRespository } from '../imessages.repository'

export class InMemoryMessagesRespository implements IMessagesRespository {
  public messages: Message[] = []

  public async save(message: Message): Promise<void> {
    const index = this.messages.findIndex(arrayMessage => arrayMessage.id.equals(message.id))

    if (index >= 0) {
      this.messages[index] = message
      return
    }

    this.messages.push(message)
  }
}
