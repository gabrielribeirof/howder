import { Entity, Column, PrimaryColumn, CreateDateColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm'
import { AgentEntity } from './agent.entity'
import { WorkspaceEntity } from './workspace.entity'
import { ChatEntity } from './chat.entity'

@Entity('members')
export class MemberEntity {
  @PrimaryColumn('uuid')
  public id: string

  @Column()
  public agent_id: string

  @Column()
  public workspace_id: string

  @Column()
  public is_admin: boolean

  @ManyToOne(() => AgentEntity)
  @JoinColumn({ name: 'agent_id' })
  public agent: AgentEntity

  @ManyToOne(() => WorkspaceEntity)
  @JoinColumn({ name: 'workspace_id' })
  public workspace: WorkspaceEntity

  @OneToMany(() => ChatEntity, chat => chat.member)
  public chats: ChatEntity[]

  @CreateDateColumn()
  public created_at: Date
}
