import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm'
import { WorkspaceEntity } from './workspace.entity'
import { MemberEntity } from './member.entity'

@Entity('teams')
export class TeamEntity {
  @PrimaryColumn('uuid')
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
}
