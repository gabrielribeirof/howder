import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateAgentTeams1619269431357 implements MigrationInterface {
  private table = new Table({
    name: 'agent_teams',
    columns: [
      {
        name: 'agent_id',
        type: 'uuid'
      },
      {
        name: 'team_id',
        type: 'uuid'
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
        columnNames: ['team_id'],
        referencedTableName: 'teams',
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
