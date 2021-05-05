import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateAgents1619224839850 implements MigrationInterface {
  private table = new Table({
    name: 'agents',
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