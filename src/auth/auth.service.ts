import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { compareHash, generateStringNumeric, hash } from 'src/core/helpers';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { User } from './entities/user.entity';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
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

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    const user = await this.userRepository.findOne({
      where: { email },
      select: { email: true, password: true, id: true },
    });

    if (!user) {
      throw new UnauthorizedException('Credential not valid');
    }

    const isValidPassword = await compareHash(password, user.password);

    if (!isValidPassword) {
      throw new UnauthorizedException('Credential not valid');
    }

    return {
      token: this.getJwtToken({ id: user.id }),
    };
  }

  private getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }
}
