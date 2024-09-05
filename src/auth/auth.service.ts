import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { generateStringNumeric, hash } from 'src/core/helpers';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async register(createUserDto: CreateUserDto) {
    const password = await hash(createUserDto.password);
    const confirmationCode = generateStringNumeric(6);
    const confirmationCodeHashed = await hash(confirmationCode);

    const user = await this.userRepository.save({
      ...createUserDto,
      password,
      confirmationCode: confirmationCodeHashed,
    });

    return {
      message:
        "Congratulations on successfully creating your account! We're glad to have you join us. Let us know if you need assistance.",
      result: plainToClass(User, user),
    };
  }
}
