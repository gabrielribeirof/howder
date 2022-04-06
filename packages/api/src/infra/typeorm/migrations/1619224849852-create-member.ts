import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateMember1619224849852 implements MigrationInterface {
  private table = new Table({
    name: 'members',
    columns: [
      {
        name: 'id',
        type: 'uuid',
        isPrimary: true
      },
      {
        name: 'agent_id',
        type: 'uuid'
      },
      {
        name: 'workspace_id',
        type: 'uuid'
      },
      {
        name: 'is_admin',
        type: 'boolean'
      },
      {
        name: 'created_at',
        type: 'timestamptz',
        default: 'now()'
      }
    ],
    foreignKeys: [
      {
        columnNames: ['agent_id'],
        referencedTableName: 'agents',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
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
