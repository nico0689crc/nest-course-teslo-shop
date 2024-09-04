import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum ProductStatus {
  AVAILABLE = 1,
  OUT_OF_STOCK = 2,
  DISCONTINUED = 3,
}

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'text',
    unique: true,
  })
  title: string;

  @Column({
    type: 'float',
    default: 0,
  })
  price: number;

  @Column({
    type: 'text',
    nullable: true,
  })
  description: string;

  @Column({
    type: 'text',
    unique: true,
  })
  slug: string;

  @Column({
    type: 'int',
    default: 0,
  })
  stock: number;

  @Column({
    type: 'text',
    array: true,
  })
  sizes: string[];

  @Column('text')
  gender: string;

  @Column({
    type: 'int',
    default: ProductStatus.AVAILABLE,
  })
  status: ProductStatus;

  @Column({
    type: 'text',
    array: true,
  })
  tags: string[];

  @BeforeInsert()
  @BeforeUpdate()
  checkSlugInsert() {
    this.slug = this.convertToSlug(this.slug ?? this.title);
  }

  private convertToSlug(text: string) {
    return text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-+/, '');
  }
}
