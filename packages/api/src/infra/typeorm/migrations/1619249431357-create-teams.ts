import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateTeams1619249431357 implements MigrationInterface {
  private table = new Table({
    name: 'teams',
    columns: [
      {
        name: 'id',
        type: 'varchar',
        isPrimary: true
      },
      {
        name: 'name',
        type: 'varchar'
      },
      {
        name: 'workspace_id',
        type: 'varchar'
      },
      {
        name: 'creator_id',
        type: 'varchar'
      }
    ],
    foreignKeys: [
      {
        columnNames: ['workspace_id'],
        referencedTableName: 'workspaces',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      {
        columnNames: ['creator_id'],
        referencedTableName: 'members',
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
