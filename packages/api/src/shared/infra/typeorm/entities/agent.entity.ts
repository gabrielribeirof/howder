import { Entity, Column, PrimaryColumn, CreateDateColumn, OneToMany } from 'typeorm'
import { WorkspaceEntity } from './workspace.entity'

@Entity('agents')
export class AgentEntity {
  @PrimaryColumn('uuid')
  public id: string

  @Column()
  public name: string

  @Column()
  public email: string

  @Column()
  public password: string

  @OneToMany(() => WorkspaceEntity, workspace => workspace.creator)
  public workspaces: WorkspaceEntity[]

  @CreateDateColumn()
  public created_at: Date
}
