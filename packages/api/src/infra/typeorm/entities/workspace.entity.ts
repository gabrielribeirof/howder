import { Entity, Column, PrimaryColumn, CreateDateColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm'
import { AgentEntity } from './agent.entity'
import { MemberEntity } from './member.entity'
import { TeamEntity } from './team.entity'
import { TagEntity } from './tag.entity'

@Entity('workspaces')
export class WorkspaceEntity {
  @PrimaryColumn('uuid')
  public id: string

  @Column()
  public name: string

  @Column()
  public creator_id: string

  @ManyToOne(() => AgentEntity, agent => agent.workspaces)
  @JoinColumn({ name: 'creator_id' })
  public creator: AgentEntity

  @OneToMany(() => MemberEntity, member => member.workspace)
  public members: MemberEntity[]

  @OneToMany(() => TeamEntity, team => team.workspace)
  public teams: TeamEntity[]

  @OneToMany(() => TagEntity, tag => tag.workspace)
  public tags: TagEntity[]

  @CreateDateColumn()
  public created_at: Date
}
