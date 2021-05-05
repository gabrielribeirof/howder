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
        name: 'username',
        type: 'varchar'
      },
      {
        name: 'email',
        type: 'varchar'
      },
      {
        name: 'updated_at',
        type: 'timestamp',
        default: 'now()'
      },
      {
        name: 'created_at',
        type: 'timestamp',
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
