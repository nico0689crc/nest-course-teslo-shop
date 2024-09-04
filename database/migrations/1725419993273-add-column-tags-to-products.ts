import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddColumnTagsToProducts1725419993273
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'product',
      new TableColumn({
        name: 'tags',
        type: 'text',
        isArray: true,
        isNullable: false,
        default: `'{}'`,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('product', 'tags');
  }
}
