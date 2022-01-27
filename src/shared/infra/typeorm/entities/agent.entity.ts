import { Entity, Column, PrimaryColumn, CreateDateColumn, ManyToMany, JoinTable, OneToMany } from 'typeorm'
import { TeamEntity } from './team.entity'
import { ChatEntity } from './chat.entity'

@Entity('agent')
export class AgentEntity {
  @PrimaryColumn('uuid')
  public id: string

  @Column()
  public name: string

  @Column()
  public email: string

  @Column()
  public password: string

  @Column()
  public admin: boolean

  @ManyToMany(() => TeamEntity, team => team.agents)
  @JoinTable({
    name: 'agent_teams',
    joinColumn: { name: 'agent_id' },
    inverseJoinColumn: { name: 'team_id' }
  })
  public teams: TeamEntity[]

  @OneToMany(() => ChatEntity, chat => chat.user)
  public chats: ChatEntity[]

  @CreateDateColumn()
  public created_at: Date
}
