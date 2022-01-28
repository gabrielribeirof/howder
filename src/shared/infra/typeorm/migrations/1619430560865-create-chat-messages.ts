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
        name: 'author_id',
        type: 'uuid'
      },
      {
        name: 'author_type',
        type: 'uuid',
        enum: ['user', 'agent']
      },
      {
        name: 'content',
        type: 'varchar'
      },
      {
        name: 'created_at',
        type: 'timestamptz',
        default: 'now()'
      }
    ],
    foreignKeys: [
      {
        columnNames: ['chat_id'],
        referencedTableName: 'chats',
        referencedColumnNames: ['id'],
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
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
