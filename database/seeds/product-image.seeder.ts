import { Product, ProductImage } from 'src/products/entities';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';

export default class ProductImageSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    const productRepository = dataSource.getRepository(Product);
    const products = await productRepository.find();

    const productImageFactory = factoryManager.get(ProductImage);

    const imagePromises = products.map(async (product) => {
      const numberOfImages = Math.floor(Math.random() * 6);

      await productImageFactory.saveMany(numberOfImages, { product });

      console.log(
        `Seeded ${numberOfImages} images for product ${product.title}.`,
      );
    });

    await Promise.all(imagePromises);

    console.log('Finished seeding product images.');
  }
}
