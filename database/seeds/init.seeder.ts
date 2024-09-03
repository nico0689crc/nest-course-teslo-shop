import { DataSource } from 'typeorm';
import { runSeeders, Seeder, SeederFactoryManager } from 'typeorm-extension';

import productFactory from 'database/factories/product.factory';
import ProductSeeder from 'database/seeds/product.seeder';

export default class InitSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    await runSeeders(dataSource, {
      seeds: [ProductSeeder],
      factories: [productFactory],
    });
  }
}
