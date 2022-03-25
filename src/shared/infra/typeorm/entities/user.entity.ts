import { Entity, Column, PrimaryColumn, CreateDateColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm'
import { WorkspaceEntity } from './workspace.entity'
import { ChatEntity } from './chat.entity'

@Entity('users')
export class UserEntity {
  @PrimaryColumn('uuid')
  public id: string

  @Column()
  public name: string

  @Column()
  public email: string

  @Column()
  public workspace_id: string

  @ManyToOne(() => WorkspaceEntity)
  @JoinColumn({ name: 'workspace_id' })
  public workspace: WorkspaceEntity

  @OneToMany(() => ChatEntity, chat => chat.user)
  public chats: ChatEntity[]

  @CreateDateColumn()
  public created_at: Date
}
