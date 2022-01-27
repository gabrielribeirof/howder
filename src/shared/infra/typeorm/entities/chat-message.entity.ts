import { ViewEntity, Connection, Column, PrimaryColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm'
import { ChatEntity } from './chat.entity'
import { UserEntity } from './user.entity'
import { AgentEntity } from './agent.entity'

@ViewEntity('chat_messages', {
  expression: (connection: Connection) => {
    return connection.createQueryBuilder()
      .select('chat_message.id', 'id')
      .addSelect('chat_message.chat_id', 'chat_id')
      .addSelect('chat_message.author_id', 'author_id')
      .addSelect('chat_message.author_type', 'author_type')
      .addSelect('chat_message.content', 'content')
      .addSelect('chat_message.created_at', 'created_at')
      .addSelect('CASE WHEN user.id IS NOT NULL THEN user ELSE agent END', 'author')
      .from('chat_messages', 'chat_message')
      .leftJoin(ChatEntity, 'chat', 'chat.id = chat_message.chat_id')
      .leftJoin(UserEntity, 'user', 'user.id = chat_message.author_id')
      .leftJoin(AgentEntity, 'agent', 'agent.id = chat_message.author_id')
  }
})
export class ChatMessageEntity {
  @PrimaryColumn('uuid')
  public id: string

  @Column()
  public chat_id: string

  @Column()
  public author_id: string

  @Column()
  public author_type: string

  @ManyToOne(() => ChatEntity, chat => chat.messages)
  @JoinColumn({ name: 'chat_id' })
  public chat: ChatEntity

  @Column()
  public readonly author: UserEntity | AgentEntity

  @Column()
  public content: string

  @CreateDateColumn()
  public created_at: Date
}
