import { Entity, Column, PrimaryColumn } from 'typeorm'

@Entity('users')
export class UserEntity {
  @PrimaryColumn('uuid')
  id: string

  @Column()
  name: string

  @Column()
  email: string
}
