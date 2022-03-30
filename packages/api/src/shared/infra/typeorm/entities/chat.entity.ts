import { Entity, Column, PrimaryColumn, CreateDateColumn, ManyToOne, ManyToMany, JoinTable, JoinColumn, RelationId } from 'typeorm'
import { WorkspaceEntity } from './workspace.entity'
import { UserEntity } from './user.entity'
import { MemberEntity } from './member.entity'
import { TagEntity } from './tag.entity'

@Entity('chats')
export class ChatEntity {
  @PrimaryColumn('uuid')
  public id: string

  @Column()
  public user_id: string

  @Column()
  public member_id: string

  @Column()
  public workspace_id: string

  @Column()
  public is_open: boolean

  @ManyToOne(() => UserEntity, user => user.chats)
  @JoinColumn({ name: 'user_id' })
  public user: UserEntity

  @ManyToOne(() => MemberEntity, member => member.chats)
  @JoinColumn({ name: 'member_id' })
  public member: MemberEntity

  @ManyToOne(() => WorkspaceEntity)
  @JoinColumn({ name: 'workspace_id' })
  public workspace: WorkspaceEntity

  @ManyToMany(() => TagEntity, tag => tag.chats)
  @JoinTable({
    name: 'chat_tags',
    joinColumn: { name: 'chat_id' },
    inverseJoinColumn: { name: 'tag_id' }
  })
  public tags: TagEntity[]

  @RelationId((chat: ChatEntity) => chat.tags)
  public tags_id: string[]

  @CreateDateColumn()
  public created_at: Date
}
