import { AuthorTypeValue } from '../domain/message/author-type'

export type MessageDTO = {
  id: string
  chat_id: string
  author_id: string
  author_type: AuthorTypeValue
  content: string
}
