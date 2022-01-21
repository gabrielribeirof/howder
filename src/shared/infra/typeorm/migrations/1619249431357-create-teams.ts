import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateTeams1619249431357 implements MigrationInterface {
  private table = new Table({
    name: 'teams',
    columns: [
      {
        name: 'id',
        type: 'uuid',
        isPrimary: true
      },
      {
        name: 'name',
        type: 'varchar'
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
