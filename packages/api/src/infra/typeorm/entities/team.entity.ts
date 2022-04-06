import { Entity, Column, PrimaryColumn, RelationId, ManyToOne, ManyToMany, JoinColumn, JoinTable } from 'typeorm'
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

  @ManyToMany(() => MemberEntity, member => member.teams)
  @JoinTable({
    name: 'team_members',
    joinColumn: { name: 'team_id' },
    inverseJoinColumn: { name: 'member_id' }
  })
  public members: MemberEntity[]

  @RelationId((team: TeamEntity) => team.members)
  public members_id: string[]
}
