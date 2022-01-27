import { Entity, Column, PrimaryColumn, CreateDateColumn, OneToMany } from 'typeorm'
import { ChatEntity } from './chat.entity'

@Entity('users')
export class UserEntity {
  @PrimaryColumn('uuid')
  public id: string

  @Column()
  public name: string

  @Column()
  public email: string

  @OneToMany(() => ChatEntity, chat => chat.user)
  public chats: ChatEntity[]

  @CreateDateColumn()
  public created_at: Date
}
