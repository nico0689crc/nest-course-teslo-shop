import { Product } from 'src/products/entities/product.entity';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';

export default class ProductSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const productRepository = dataSource.getRepository(Product);

    // Check if there are any existing records
    const count = await productRepository.count();

    if (count === 0) {
      const productFactory = factoryManager.get(Product);
      await productFactory.saveMany(1000);
      console.log('Seeded 1000 products.');
    } else {
      console.log(`Skipped seeding products. ${count} products already exist.`);
    }
  }
}
