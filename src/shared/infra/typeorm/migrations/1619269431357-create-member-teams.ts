import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateMemberTeams1619269431357 implements MigrationInterface {
  private table = new Table({
    name: 'member_teams',
    columns: [
      {
        name: 'member_id',
        type: 'uuid'
      },
      {
        name: 'team_id',
        type: 'uuid'
      }
    ],
    foreignKeys: [
      {
        columnNames: ['member_id'],
        referencedTableName: 'members',
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
