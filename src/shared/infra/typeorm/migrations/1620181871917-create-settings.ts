import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateSettings1620181871917 implements MigrationInterface {
  private table = new Table({
    name: 'settings',
    columns: [
      {
        name: 'id',
        type: 'uuid',
        isPrimary: true
      },
      {
        name: 'setting_name',
        type: 'varchar'
      },
      {
        name: 'setting_value',
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
