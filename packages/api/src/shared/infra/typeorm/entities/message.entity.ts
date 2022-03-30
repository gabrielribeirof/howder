import { ViewEntity, Connection, Column, PrimaryColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm'
import { ChatEntity } from './chat.entity'
import { UserEntity } from './user.entity'
import { AgentEntity } from './agent.entity'

@ViewEntity('messages', {
  expression: (connection: Connection) => {
    return connection.createQueryBuilder()
      .select('message.id', 'id')
      .addSelect('message.chat_id', 'chat_id')
      .addSelect('message.author_id', 'author_id')
      .addSelect('message.author_type', 'author_type')
      .addSelect('message.content', 'content')
      .addSelect('message.created_at', 'created_at')
      .addSelect('CASE WHEN user.id IS NOT NULL THEN user ELSE agent END', 'author')
      .from('messages', 'message')
      .leftJoin(ChatEntity, 'chat', 'chat.id = message.chat_id')
      .leftJoin(UserEntity, 'user', 'user.id = message.author_id')
      .leftJoin(AgentEntity, 'agent', 'agent.id = message.author_id')
  }
})
export class MessageEntity {
  @PrimaryColumn('uuid')
  public id: string

  @Column()
  public chat_id: string

  @Column()
  public author_id: string

  @Column()
  public author_type: string

  @Column()
  public content: string

  @ManyToOne(() => ChatEntity)
  @JoinColumn({ name: 'chat_id' })
  public chat: ChatEntity

  @Column()
  public readonly author: UserEntity | AgentEntity

  @CreateDateColumn()
  public created_at: Date
}
