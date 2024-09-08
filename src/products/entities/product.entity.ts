import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/auth/entities/user.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductImage } from './product-image.entity';

export enum ProductStatus {
  AVAILABLE = 1,
  OUT_OF_STOCK = 2,
  DISCONTINUED = 3,
}

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ description: 'The unique identifier of the product' })
  id: string;

  @Column({
    type: 'text',
    unique: true,
  })
  @ApiProperty({ description: 'The title of the product' })
  title: string;

  @Column({
    type: 'float',
    default: 0,
  })
  @ApiProperty({ description: 'The price of the product' })
  price: number;

  @Column({
    type: 'text',
    nullable: true,
  })
  @ApiProperty({
    description: 'A short description of the product',
    required: false,
  })
  description: string;

  @Column({
    type: 'text',
    unique: true,
  })
  @ApiProperty({ description: 'The unique slug for the product URL' })
  slug: string;

  @Column({
    type: 'int',
    default: 0,
  })
  @ApiProperty({ description: 'The stock quantity of the product' })
  stock: number;

  @Column({
    type: 'text',
    array: true,
  })
  @ApiProperty({ description: 'The available sizes for the product' })
  sizes: string[];

  @Column('text')
  @ApiProperty({ description: 'The gender for which the product is designed' })
  gender: string;

  @Column({
    type: 'int',
    default: ProductStatus.AVAILABLE,
  })
  @ApiProperty({
    description: 'The current status of the product',
    enum: ProductStatus,
  })
  status: ProductStatus;

  @Column({
    type: 'text',
    array: true,
  })
  @ApiProperty({
    description: 'Tags related to the product',
    example: ['fashion', 'shoes'],
    required: false,
  })
  tags: string[];

  @BeforeInsert()
  @BeforeUpdate()
  checkSlugInsert() {
    this.slug = this.convertToSlug(this.slug ?? this.title);
  }

  @OneToMany(() => ProductImage, (productImage) => productImage.product, {
    cascade: true,
    eager: true,
  })
  @ApiProperty({
    description: 'List of images related to the product',
    type: [ProductImage],
  })
  images?: ProductImage[];

  @ManyToOne(() => User, (user) => user.products, {
    onDelete: 'CASCADE',
  })
  // @ApiProperty({ description: 'The user who owns the product' })
  user: User;

  private convertToSlug(text: string) {
    return text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-+/, '');
  }
}
