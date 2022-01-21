import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateTag1642788424064 implements MigrationInterface {
  private table = new Table({
    name: 'tags',
    columns: [
      {
        name: 'id',
        type: 'uuid',
        isPrimary: true
      },
      {
        name: 'name',
        type: 'varchar'
      },
      {
        name: 'author_id',
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
        columnNames: ['author_id'],
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
