import { WatchedList } from '@shared/core/domain/watched-list'

import { ChatTag } from './chat-tag'

export class ChatTags extends WatchedList<ChatTag> {
  private constructor(chats: ChatTag[]) {
    super(chats)
  }

  public compareItems(a: ChatTag, b: ChatTag): boolean {
    return a.equals(b)
  }

  public static create(chatTags?: ChatTag[]): ChatTags {
    return new ChatTags(chatTags || [])
  }
}
