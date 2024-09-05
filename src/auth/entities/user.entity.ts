import { Exclude } from 'class-transformer';
import { Product } from 'src/products/entities';

import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum UserRole {
  USER_REGULAR = 'USER_REGULAR',
  USER_ADMINISTRATOR = 'USER_ADMINISTRATOR',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true, unique: true })
  email: string;

  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column({ name: 'confirmation_code', nullable: true })
  @Exclude()
  confirmationCode: string;

  @Column({ name: 'email_verified', default: false })
  @Exclude()
  emailVerified: boolean;

  @CreateDateColumn({ name: 'email_verified_at', default: null })
  @Exclude()
  emailVerifiedAt: Date;

  @Column({ name: 'password_reset_token', nullable: true })
  @Exclude()
  passwordResetToken: string;

  @CreateDateColumn({ name: 'password_reset_token_req_at', nullable: true })
  @Exclude()
  passwordResetTokenReqAt: Date;

  @Column()
  @Exclude()
  password: string;

  @Exclude()
  passwordConfirmation: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER_REGULAR,
  })
  role: UserRole;

  @CreateDateColumn({ name: 'created_at' })
  @Exclude()
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  @Exclude()
  updatedAt: Date;

  @OneToMany(() => Product, (product) => product.user, {
    cascade: true,
  })
  products: Product[];
}
