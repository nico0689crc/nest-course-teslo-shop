import { ProductStatus } from 'src/products/entities/product.entity';
import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddColumnToProducts1725388891853 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'product',
      new TableColumn({
        name: 'status',
        type: 'int',
        isNullable: false, // Set to true if you want it to be nullable
        default: `${ProductStatus.AVAILABLE}`, // Optionally set a default value
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('product', 'status');
  }
}
