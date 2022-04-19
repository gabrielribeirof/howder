import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateTeamMembers1619269431357 implements MigrationInterface {
  private table = new Table({
    name: 'team_members',
    columns: [
      {
        name: 'team_id',
        type: 'varchar'
      },
      {
        name: 'member_id',
        type: 'varchar'
      }
    ],
    foreignKeys: [
      {
        columnNames: ['team_id'],
        referencedTableName: 'teams',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      {
        columnNames: ['member_id'],
        referencedTableName: 'members',
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
