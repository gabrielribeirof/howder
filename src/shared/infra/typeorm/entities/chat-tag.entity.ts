import { Entity, Column, PrimaryColumn, CreateDateColumn, ManyToOne, ManyToMany, JoinColumn, JoinTable } from 'typeorm'
import { AgentEntity } from './agent.entity'
import { ChatEntity } from './chat.entity'

@Entity('chat-tags')
export class ChatTagEntity {
  @PrimaryColumn('uuid')
  public id: string

  @Column()
  public name: string

  @Column()
  public author_id: string

  @ManyToOne(() => AgentEntity)
  @JoinColumn({ name: 'author_id' })
  public author: AgentEntity

  @ManyToMany(() => ChatEntity, chat => chat.tags)
  public chats: ChatEntity[]

  @CreateDateColumn()
  public created_at: Date
}
