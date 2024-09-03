import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { PaginationQueryDto } from 'src/common/dtos/pagination-query.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    return await this.productsService.create(createProductDto);
  }

  @Get()
  async findAll(@Query() paginationQueryDto: PaginationQueryDto) {
    return await this.productsService.findAll(paginationQueryDto);
  }

  @Get(':search_param')
  async findOne(@Param('search_param') search_param: string) {
    return await this.productsService.findOne(search_param);
  }

  @Patch(':search_param')
  async update(
    @Param('search_param') search_param: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return await this.productsService.update(search_param, updateProductDto);
  }

  @Delete(':search_param')
  async remove(@Param('search_param') search_param: string) {
    return await this.productsService.remove(search_param);
  }
}
