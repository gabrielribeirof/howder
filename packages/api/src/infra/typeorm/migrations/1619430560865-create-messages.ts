import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateMessages1619430560865 implements MigrationInterface {
  private table = new Table({
    name: 'messages',
    columns: [
      {
        name: 'id',
        type: 'varchar',
        isPrimary: true
      },
      {
        name: 'chat_id',
        type: 'varchar'
      },
      {
        name: 'author_id',
        type: 'varchar'
      },
      {
        name: 'author_type',
        type: 'varchar',
        enum: ['user', 'member']
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
