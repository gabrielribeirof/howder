import { ValueObject } from '@shared/core/domain/value-object'
import { Identifier } from '@shared/core/domain/identifier'

interface ChatTagProperties {
  tag_id: Identifier
}

export class ChatTag extends ValueObject<ChatTagProperties> {
  public get tag_id(): Identifier {
    return this.properties.tag_id
  }

  private constructor(properties: ChatTagProperties) {
    super(properties)
  }

  public static create(properties: ChatTagProperties): ChatTag {
    return new ChatTag({ tag_id: properties.tag_id })
  }
}
