import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { isUUID } from 'class-validator';
import { PaginationQueryDto } from 'src/common/dtos/pagination-query.dto';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  private readonly logger = new Logger('ProductsService');

  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    try {
      const product = this.productRepository.create(createProductDto);

      await this.productRepository.save(product);

      return product;
    } catch (error) {
      this.handleException(error);
    }
  }

  async findAll(paginationQuery: PaginationQueryDto) {
    const { page, limit } = paginationQuery;

    const [result, total] = await this.productRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      data: result,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(search_param: string) {
    return await this.getProduct(search_param);
  }

  async update(search_param: string, updateProductDto: UpdateProductDto) {
    try {
      const product = await this.getProduct(search_param);

      const updatedProduct = this.productRepository.merge(
        product,
        updateProductDto,
      );

      return await this.productRepository.save(updatedProduct);
    } catch (error) {
      this.handleException(error);
    }
  }

  async remove(search_param: string) {
    const product = await this.getProduct(search_param);

    await this.productRepository.remove(product);
  }

  private handleException(error: any) {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    }

    this.logger.error(error);

    throw new InternalServerErrorException(
      'Unexpected error, check server logs.',
    );
  }

  private async getProduct(search_param: string) {
    const product = await this.productRepository.findOne({
      where: isUUID(search_param, 4)
        ? { id: search_param }
        : { slug: search_param },
    });

    if (!product) {
      throw new NotFoundException(
        `Product with the search key ${search_param}`,
      );
    }

    return product;
  }
}
