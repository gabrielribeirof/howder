import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateTags1642788424064 implements MigrationInterface {
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
        name: 'creator_id',
        type: 'uuid'
      },
      {
        name: 'workspace_id',
        type: 'uuid'
      },
      {
        name: 'created_at',
        type: 'timestamptz',
        default: 'now()'
      }
    ],
    foreignKeys: [
      {
        columnNames: ['creator_id'],
        referencedTableName: 'members',
        referencedColumnNames: ['id'],
        onUpdate: 'CASCADE'
      },
      {
        columnNames: ['workspace_id'],
        referencedTableName: 'workspaces',
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
