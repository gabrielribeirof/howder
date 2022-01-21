import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateChatTags1642788783022 implements MigrationInterface {
  private table = new Table({
    name: 'chat_tags',
    columns: [
      {
        name: 'chat_id',
        type: 'uuid'
      },
      {
        name: 'tag_id',
        type: 'uuid'
      }
    ],
    foreignKeys: [
      {
        columnNames: ['chat_id'],
        referencedTableName: 'chat',
        referencedColumnNames: ['id'],
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      {
        columnNames: ['tag_id'],
        referencedTableName: 'tags',
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
