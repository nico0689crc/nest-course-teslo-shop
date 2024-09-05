import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable } from 'rxjs';
import { User } from 'src/auth/entities/user.entity';
import { Repository } from 'typeorm';
import { UserAlreadyExists } from '../exceptions/user-already-exists';

@Injectable()
export class DoesUserExist implements CanActivate {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return this.validateRequest(request);
  }

  async validateRequest(request: any) {
    const user = await this.userRepository.findOne({
      where: {
        email: request.body.email,
      },
    });
    if (user) {
      throw new UserAlreadyExists();
    }
    return true;
  }
}
