import { Product } from 'src/products/entities/product.entity';
import { setSeederFactory } from 'typeorm-extension';

export default setSeederFactory(Product, async (faker) => {
  const product = new Product();

  product.title = faker.lorem.words({ min: 5, max: 15 });
  product.price = +faker.commerce.price({ dec: 2, min: 1, max: 500000 });
  product.stock = +faker.number.int({ min: 0, max: 1000 });
  product.description = faker.commerce.productDescription();
  product.gender = faker.helpers.arrayElement([
    'men',
    'women',
    'kid',
    'unisex',
  ]);
  product.sizes = faker.helpers.arrayElements(['sm', 'm', 'l', 'xl'], {
    min: 1,
    max: 4,
  });

  return product;
});
