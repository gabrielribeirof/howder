import { Entity, Column, PrimaryColumn, CreateDateColumn, ManyToOne, ManyToMany, JoinColumn } from 'typeorm'
import { WorkspaceEntity } from './workspace.entity'
import { MemberEntity } from './member.entity'
import { ChatEntity } from './chat.entity'

@Entity('tags')
export class TagEntity {
  @PrimaryColumn()
  public id: string

  @Column()
  public name: string

  @Column()
  public workspace_id: string

  @Column()
  public creator_id: string

  @ManyToOne(() => WorkspaceEntity)
  @JoinColumn({ name: 'workspace_id' })
  public workspace: WorkspaceEntity

  @ManyToOne(() => MemberEntity)
  @JoinColumn({ name: 'creator_id' })
  public creator: MemberEntity

  @ManyToMany(() => ChatEntity, chat => chat.tags)
  public chats: ChatEntity[]

  @CreateDateColumn()
  public created_at: Date
}
