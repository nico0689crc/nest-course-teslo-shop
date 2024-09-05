import { DataSource } from 'typeorm';
import { runSeeders, Seeder, SeederFactoryManager } from 'typeorm-extension';

import productImageFactory from 'database/factories/product-image.factory';
import productFactory from 'database/factories/product.factory';
import userFactory from 'database/factories/user.factory';
import ProductSeeder from 'database/seeds/product.seeder';
import ProductImageSeeder from './product-image.seeder';
import UserSeeder from './users.seeder';

export default class InitSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    await runSeeders(dataSource, {
      seeds: [ProductSeeder, ProductImageSeeder, UserSeeder],
      factories: [productFactory, productImageFactory, userFactory],
    });
  }
}
