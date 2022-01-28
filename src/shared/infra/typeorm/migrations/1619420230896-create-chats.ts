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
        type: 'uuid',
        isNullable: true
      },
      {
        name: 'open',
        type: 'boolean',
        default: true
      },
      {
        name: 'created_at',
        type: 'timestamptz',
        default: 'now()'
      }
    ],
    foreignKeys: [
      {
        columnNames: ['user_id'],
        referencedTableName: 'users',
        referencedColumnNames: ['id'],
        onUpdate: 'CASCADE'
      },
      {
        columnNames: ['agent_id'],
        referencedTableName: 'agents',
        referencedColumnNames: ['id'],
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
