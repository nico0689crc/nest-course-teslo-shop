import { Product } from 'src/products/entities/product.entity';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';

export default class ProductSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const productFactory = factoryManager.get(Product);

    await productFactory.saveMany(1000);
  }
}
