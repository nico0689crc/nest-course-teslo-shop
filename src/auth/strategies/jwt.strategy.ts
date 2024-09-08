import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { JwtPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    configService: ConfigService,
  ) {
    super({
      secretOrKey: configService.get('JWT_SECRET'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate({ id }: JwtPayload): Promise<User> {
    if (!id) {
      throw new UnauthorizedException('Token not valid.');
    }

    const user = await this.userRepository.findOne({ where: { id: id } });

    if (!user) {
      throw new UnauthorizedException('Token not valid.');
    }

    if (!user?.emailVerified) {
      throw new UnauthorizedException(
        'User not active, please verify your email.',
      );
    }

    return user;
  }
}
