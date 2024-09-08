import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsIn,
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUrl,
  MinLength,
  ValidateNested,
} from 'class-validator';

export class CreateProductImageDto {
  @IsString()
  @IsUrl()
  url: string;
}

export class CreateProductDto {
  @IsString()
  @MinLength(1)
  @ApiProperty({
    description: 'The title of the product',
    example: 'Stylish Shoes',
  })
  title: string;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  @ApiProperty({
    description: 'The price of the product',
    example: 49.99,
  })
  price?: number;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'A short description of the product',
    example: 'Durable and stylish shoes',
  })
  description?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'A slug of the product',
    example: 'durable-and-stylish-shoes',
    required: false,
  })
  slug?: string;

  @ApiProperty({
    description: 'The stock quantity of the product',
    example: 100,
  })
  @IsInt()
  @IsPositive()
  @IsOptional()
  stock?: number;

  @IsString({ each: true })
  @IsArray()
  @IsIn(['sm', 'm', 'l', 'xl'], { each: true })
  @ApiProperty({
    description: 'The available sizes for the product',
    example: ['S', 'M', 'L', 'XL'],
  })
  sizes: string[];

  @IsIn(['men', 'women', 'kid', 'unisex'])
  @ApiProperty({
    description: 'The gender for which the product is designed',
    example: 'unisex',
  })
  gender: string;

  @IsString({ each: true })
  @IsArray()
  @IsOptional()
  @ApiProperty({
    description: 'The tags for which the product is designed',
    example: 'unisex',
  })
  tags: string[];

  @ValidateNested()
  @Type(() => CreateProductImageDto)
  @IsOptional()
  images?: CreateProductImageDto[];
}
