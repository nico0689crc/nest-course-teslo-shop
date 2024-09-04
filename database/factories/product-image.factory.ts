import { ProductImage } from 'src/products/entities/product-image.entity';
import { Product } from 'src/products/entities/product.entity';
import { setSeederFactory } from 'typeorm-extension';

export default setSeederFactory(
  ProductImage,
  async (faker, context: { product: Product }) => {
    const productImage = new ProductImage();
    productImage.url = faker.image.avatarLegacy();

    if (context?.product) {
      productImage.product = context.product;
    }

    return productImage;
  },
);
