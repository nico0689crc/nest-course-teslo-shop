import { User, UserRole } from 'src/auth/entities/user.entity';
import { Product } from 'src/products/entities';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';

export default class UserSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    const userRepository = dataSource.getRepository(User);
    const productRepository = dataSource.getRepository(Product);

    const usersCount = await userRepository.count();

    if (usersCount === 0) {
      const userFactory = factoryManager.get(User);

      const userAdministrator = await userFactory.save({
        email: 'admin@email.com',
        role: UserRole.USER_ADMINISTRATOR,
      });

      const userRegular = await userFactory.save({
        email: 'regular@email.com',
      });

      const additionalUsers = await userFactory.saveMany(8);

      const allUsers = [userAdministrator, userRegular, ...additionalUsers];

      const products = await productRepository.find();

      const updatePromises = products.map((product) => {
        const randomUser =
          allUsers[Math.floor(Math.random() * allUsers.length)];

        product.user = randomUser;

        return productRepository.save(product);
      });

      await Promise.all(updatePromises);
    }
  }
}
