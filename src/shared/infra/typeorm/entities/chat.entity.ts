import { Entity, Column, PrimaryColumn, CreateDateColumn, ManyToOne, OneToMany, ManyToMany, JoinTable, JoinColumn } from 'typeorm'
import { UserEntity } from './user.entity'
import { AgentEntity } from './agent.entity'
import { ChatTagEntity } from './chat-tag.entity'
import { ChatMessageEntity } from './chat-message.entity'

@Entity('chats')
export class ChatEntity {
  @PrimaryColumn('uuid')
  public id: string

  @Column()
  public user_id: string

  @Column()
  public agent_id: string

  @ManyToOne(() => UserEntity, user => user.chats)
  @JoinColumn({ name: 'user_id' })
  public user: UserEntity

  @ManyToOne(() => AgentEntity, agent => agent.chats)
  @JoinColumn({ name: 'agent_id' })
  public agent: AgentEntity

  @OneToMany(() => ChatMessageEntity, chat_message => chat_message.chat_id)
  public messages: ChatMessageEntity[]

  @ManyToMany(() => ChatTagEntity, chat_tag => chat_tag.chats)
  @JoinTable({
    name: 'chat_tags',
    joinColumn: { name: 'chat_id' },
    inverseJoinColumn: { name: 'tag_id' }
  })
  public tags: ChatTagEntity[]

  @Column()
  public open: boolean

  @CreateDateColumn()
  public created_at: Date
}
