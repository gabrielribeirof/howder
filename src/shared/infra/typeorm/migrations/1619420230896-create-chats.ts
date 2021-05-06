import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateChats1619420230896 implements MigrationInterface {
  private table = new Table({
    name: 'chats',
    columns: [
      {
        name: 'id',
        type: 'uuid',
        isPrimary: true
      },
      {
        name: 'user_id',
        type: 'uuid'
      },
      {
        name: 'agent_id',
        type: 'uuid'
      },
      {
        name: 'created_at',
        type: 'timestamp',
        default: 'now()'
      }
    ],
    foreignKeys: [
      {
        name: 'FKUser',
        columnNames: ['user_id'],
        referencedTableName: 'users',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
      },
      {
        name: 'FKAgent',
        columnNames: ['agent_id'],
        referencedTableName: 'agents',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
      }
    ]
  })

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.table)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.table)
  }
}
