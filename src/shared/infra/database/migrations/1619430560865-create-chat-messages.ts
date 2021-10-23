import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateChatMessages1619430560865 implements MigrationInterface {
  private table = new Table({
    name: 'chat_messages',
    columns: [
      {
        name: 'id',
        type: 'uuid',
        isPrimary: true
      },
      {
        name: 'chat_id',
        type: 'uuid'
      },
      {
        name: 'is_admin',
        type: 'boolean'
      },
      {
        name: 'content',
        type: 'varchar'
      },
      {
        name: 'created_at',
        type: 'timestamp',
        default: 'now()'
      }
    ],
    foreignKeys: [
      {
        name: 'FKChat',
        columnNames: ['chat_id'],
        referencedTableName: 'chats',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
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
