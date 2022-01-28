import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateUsers1619224189450 implements MigrationInterface {
  private table = new Table({
    name: 'users',
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
        name: 'email',
        type: 'varchar',
        isNullable: true,
        isUnique: true
      },
      {
        name: 'created_at',
        type: 'timestamptz',
        default: 'now()'
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
