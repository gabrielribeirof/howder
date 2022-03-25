import { Entity, Column, PrimaryColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm'
import { AgentEntity } from './agent.entity'

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

  @CreateDateColumn()
  public created_at: Date
}
