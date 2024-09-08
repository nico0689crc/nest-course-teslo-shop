import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { User } from 'src/auth/entities/user.entity';
import { META_ROLES } from '../decorators/role-protected.decorator';

@Injectable()
export class GetUserRoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const { user }: { user: User } = context.switchToHttp().getRequest();
    const validRoles: string[] = this.reflector.get(
      META_ROLES,
      context.getHandler(),
    );

    if (!user) {
      throw new BadRequestException('User not found');
    }

    if (!validRoles || validRoles.length === 0) {
      return true;
    }

    return validRoles.includes(user.role);
  }
}
