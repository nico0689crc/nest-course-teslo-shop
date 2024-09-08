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
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Auth } from 'src/auth/decorators/auth.docorator';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from 'src/auth/entities/user.entity';
import { PaginationQueryDto } from 'src/common/dtos/pagination-query.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities';
import { ProductsService } from './products.service';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @Auth()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new product' })
  @ApiResponse({
    status: 201,
    description: 'The product has been successfully created.',
    type: Product,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  async create(
    @Body() createProductDto: CreateProductDto,
    @GetUser() user: User,
  ) {
    return await this.productsService.create(createProductDto, user);
  }

  @ApiOperation({ summary: 'Retrieve all products with pagination' })
  @ApiQuery({
    name: 'page',
    required: false,
    description: 'Page number for pagination',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Number of items per page',
  })
  @ApiResponse({
    status: 200,
    description: 'The list of products',
    type: [Product],
  })
  @Get()
  async findAll(@Query() paginationQueryDto: PaginationQueryDto) {
    return await this.productsService.findAll(paginationQueryDto);
  }

  @ApiOperation({ summary: 'Get product by ID or slug' })
  @ApiResponse({
    status: 200,
    description: 'The product data',
    type: Product,
  })
  @ApiResponse({ status: 404, description: 'Product not found' })
  @Get(':search_param')
  async findOne(@Param('search_param') search_param: string) {
    return await this.productsService.findOne(search_param);
  }

  @Patch(':search_param')
  @Auth()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update an existing product by ID or slug' })
  @ApiResponse({
    status: 200,
    description: 'The updated product data',
    type: Product,
  })
  @ApiResponse({ status: 404, description: 'Product not found' })
  async update(
    @Param('search_param') search_param: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return await this.productsService.update(search_param, updateProductDto);
  }

  @Delete(':search_param')
  @Auth()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a product by ID or slug' })
  @ApiResponse({ status: 200, description: 'Product deleted successfully' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  async remove(@Param('search_param') search_param: string) {
    return await this.productsService.remove(search_param);
  }
}
