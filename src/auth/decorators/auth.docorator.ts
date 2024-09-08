import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserRole } from '../entities/user.entity';
import { GetUserRoleGuard } from '../guards/get-user-role.guard';
import { RoleProtected } from './role-protected.decorator';

export function Auth(...roles: UserRole[]) {
  return applyDecorators(
    RoleProtected(...roles),
    UseGuards(AuthGuard(), GetUserRoleGuard),
  );
}
