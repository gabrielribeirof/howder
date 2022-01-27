import { Entity, Column, PrimaryColumn, ManyToMany } from 'typeorm'
import { AgentEntity } from './agent.entity'

@Entity('teams')
export class TeamEntity {
  @PrimaryColumn('uuid')
  public id: string

  @Column()
  public name: string

  @ManyToMany(() => AgentEntity, agent => agent.teams)
  public agents: AgentEntity[];
}
